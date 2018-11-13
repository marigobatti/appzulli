import { ExtractJwt, Strategy } from 'passport-jwt';
import { Config } from './main';
import { usuarioService } from '../service/usuario';

/** Check if the JWT matches an user in the database. */
export const jwtStrategy = (passport) => {
    const opts = {jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'), secretOrKey: Config.secret};

    passport.use(new Strategy(opts, (jwtPayload, done) => {
        const repository = usuarioService.getByEmail(jwtPayload.email);

        repository
        .then((usuario) => {
            if (usuario) {
                done(null, usuario);
            } else {
                done(null, false);
            }
        })
        .catch((err) => done(err, false));

    }));
};