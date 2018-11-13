"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var usuario_1 = require("./usuario");
var pessoa_1 = require("./pessoa");
var ping_1 = require("./ping");
exports.CONTROLLERS = [
    new usuario_1.UsuarioController(),
    new pessoa_1.PessoaController(),
    new ping_1.PingController()
];
