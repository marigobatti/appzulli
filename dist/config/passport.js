"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport_jwt_1 = require("passport-jwt");
var main_1 = require("./main");
var usuario_1 = require("../service/usuario");
/** Check if the JWT matches an user in the database. */
exports.jwtStrategy = function (passport) {
    var opts = { jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('jwt'), secretOrKey: main_1.Config.secret };
    passport.use(new passport_jwt_1.Strategy(opts, function (jwtPayload, done) {
        var repository = usuario_1.usuarioService.getByUsername(jwtPayload.username);
        repository
            .then(function (usuario) {
            if (usuario) {
                done(null, usuario);
            }
            else {
                done(null, false);
            }
        })
            .catch(function (err) { return done(err, false); });
    }));
};
