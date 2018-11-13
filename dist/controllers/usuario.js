"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var usuario_1 = require("../service/usuario");
var bcrypt = require("bcrypt-nodejs");
var main_1 = require("../config/main");
var jwt = require("jsonwebtoken");
var UsuarioController = /** @class */ (function () {
    function UsuarioController() {
    }
    UsuarioController.prototype.initialize = function (httpServer) {
        // get
        httpServer.get('/usuarios', this.list.bind(this));
        httpServer.get('/usuarios/:email', this.getByEmail.bind(this));
        // put
        httpServer.put('/usuarios/:email', this.update.bind(this));
        // delete
        httpServer.del('/usuarios/:email', this.remove.bind(this));
        // registrar usuários e autenticação
        httpServer.post('/usuarios', this.registrarUsuario.bind(this));
        httpServer.post('/usuarios/login', this.autenticar.bind(this));
    };
    UsuarioController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = res).send;
                        return [4 /*yield*/, usuario_1.usuarioService.list()];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    UsuarioController.prototype.remove = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usuario_1.usuarioService.delete(req.params.email)];
                    case 1:
                        usuario = _a.sent();
                        res.send(usuario ? 200 : 404, usuario);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.getByUsername = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usuario_1.usuarioService.getByUsername(req.params.username)];
                    case 1:
                        usuario = _a.sent();
                        res.send(usuario ? 200 : 404, usuario);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.getByEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usuario_1.usuarioService.getByEmail(req.params.email)];
                    case 1:
                        usuario = _a.sent();
                        res.send(usuario ? 200 : 404, usuario);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.registrarUsuario = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!req.body.email || !req.body.username || !req.body.senha)) return [3 /*break*/, 1];
                        res.send({ sucess: false, message: 'Por favor, coloque um email e senha para se registrar.' });
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, usuario_1.usuarioService.getByEmail(req.body.email)];
                    case 2:
                        usuario = _a.sent();
                        if (!usuario) return [3 /*break*/, 3];
                        res.send({ success: false, message: 'Esse email já está sendo utilizado.' });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, usuario_1.usuarioService.create(req.body)];
                    case 4:
                        _a.sent();
                        res.send({ success: true, message: 'Usuário criado com sucesso!' });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UsuarioController.prototype.autenticar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var usuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usuario_1.usuarioService.getByEmail(req.body.email)];
                    case 1:
                        usuario = _a.sent();
                        if (!usuario) {
                            res.send({ success: false, message: 'Falha no login. Email ou senha inválidos.' });
                        }
                        else {
                            // Verificar se as senhas batem
                            bcrypt.compare(req.body.senha, usuario.senha, function (err, isMatch) {
                                // Criar token
                                if (isMatch && !err) {
                                    var token = jwt.sign(JSON.parse(JSON.stringify(usuario)), main_1.Config.secret, {
                                        expiresIn: '3h'
                                    });
                                    res.send({ success: true, token: 'JWT ' + token });
                                }
                                else {
                                    res.send({ success: false, message: 'Falha no login. Usuário ou senha inválidos.' });
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return UsuarioController;
}());
exports.UsuarioController = UsuarioController;
