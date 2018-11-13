import { UsuarioController } from './usuario';
import { PessoaController } from './pessoa';
import { PingController } from './ping';

export const CONTROLLERS = [
    new UsuarioController(),
    new PessoaController(),
    new PingController()
];