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
var usuario_1 = require("../models/usuario");
var database_1 = require("../database");
var saltRounds = 15;
var UsuarioService = /** @class */ (function () {
    function UsuarioService() {
    }
    UsuarioService.prototype.create = function (usuario) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.DatabaseProvider.getConnection()];
                    case 1:
                        connection = _a.sent();
                        entity = new usuario_1.Usuario();
                        entity.username = usuario.username;
                        entity.email = usuario.email;
                        entity.senha = usuario.senha;
                        entity.funcao = usuario.funcao;
                        entity.status = usuario.status;
                        return [4 /*yield*/, connection.getRepository(usuario_1.Usuario).save(entity)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsuarioService.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.DatabaseProvider.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getRepository(usuario_1.Usuario).find()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsuarioService.prototype.update = function (usuario) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, repo, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.DatabaseProvider.getConnection()];
                    case 1:
                        connection = _a.sent();
                        repo = connection.getRepository(usuario_1.Usuario);
                        return [4 /*yield*/, repo.findOne(usuario.id)];
                    case 2:
                        entity = _a.sent();
                        entity.email = usuario.email;
                        entity.senha = usuario.senha;
                        entity.funcao = usuario.funcao;
                        entity.status = usuario.status;
                        return [4 /*yield*/, repo.save(entity)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsuarioService.prototype.delete = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.DatabaseProvider.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getRepository(usuario_1.Usuario).delete({ email: email })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsuarioService.prototype.getByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.DatabaseProvider.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getRepository(usuario_1.Usuario).findOne({ username: username })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsuarioService.prototype.getByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1.DatabaseProvider.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getRepository(usuario_1.Usuario).findOne({ email: email })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UsuarioService;
}());
exports.UsuarioService = UsuarioService;
exports.usuarioService = new UsuarioService();
