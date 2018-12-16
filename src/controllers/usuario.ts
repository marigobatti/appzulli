import { IController } from './controller';
import { IHttpServer } from '../server/httpServer';
import { Request, Response, Next } from 'restify';
import { usuarioService } from '../service/usuario';
import { Usuario } from '../models/usuario';
import { ValidationUtil } from '../util/validationUtil';
import * as bcrypt from 'bcrypt-nodejs';
import { Config } from '../config/main';
import * as jwt from 'jsonwebtoken';

export class UsuarioController implements IController {
    public initialize(httpServer: IHttpServer): void {
        // get
        httpServer.get('/usuarios', this.list.bind(this), false); // true
        httpServer.get('/usuario', this.usuarioLogado.bind(this), false); // true
        httpServer.get(
            '/usuarios/:username', this.getByUsername.bind(this), false); // true

        // put
        httpServer.put('/usuarios/:username', this.update.bind(this), false); // true

        // delete
        httpServer.del('/usuarios/:username', this.remove.bind(this), false); // true

        // registrar usuários e autenticação
        httpServer.post('/usuarios', this.create.bind(this), false);
        httpServer.post('/usuarios/login', this.autenticar.bind(this), false);
    }

    private async list(req: any, res: Response): Promise<void> {
        res.send(await usuarioService.list());
    }

    private async usuarioLogado(req: any, res: Response, next: Next): Promise<void> {
        res.redirect('/usuarios/' + req.user.username, next);
    }

    private async create(req: Request, res: Response): Promise<void> {
        res.send(await usuarioService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        // TODO: Homework
    }

    private async remove(req: Request, res: Response): Promise<void> {
        const usuario = await usuarioService.delete(req.params.username);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async getByUsername(req: Request, res: Response): Promise<void> {
        const usuario = await usuarioService.getByUsername(req.params.username);
        res.send(usuario ? 200 : 404, usuario);
    }

    private async registrarUsuario(req: Request, res: Response): Promise<void> {
        if (!req.body.email || !req.body.username || !req.body.senha)
            res.send({sucess: false, message: 'Por favor, coloque um email e senha para se registrar.'});
        else {
            const usuario = await usuarioService.getByEmail(req.body.email);
            if (usuario) {
                res.send({success: false, message: 'Esse email já está sendo utilizado.'});
            } else {
                await usuarioService.create(req.body);
                res.send({success: true, message: 'Usuário criado com sucesso!'});
            }
        }
    }

    private async autenticar(req: Request, res: Response): Promise<void> {
        const usuario: Usuario = await usuarioService.getByEmail(req.body.email);

        if (!usuario) {
            res.send({success: false, message: 'Falha no login. Email ou senha inválidos.'});
        } else {
            // Verificar se as senhas batem
            bcrypt.compare(req.body.senha, usuario.senha, (err, isMatch) => {
                // Criar token
                if (isMatch && !err) {
                    const token = jwt.sign(JSON.parse(JSON.stringify(usuario)), Config.secret, {
                        expiresIn: '3h'
                    });

                    res.send({success: true, token: 'JWT ' + token});
                } else {
                    res.send({success: false, message: 'Falha no login. Usuário ou senha inválidos.'});
                }
            });
        }
    }
}
