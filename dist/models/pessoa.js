"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Joi = require("joi");
var Pessoa = /** @class */ (function () {
    function Pessoa() {
    }
    Pessoa.getSchema = function () {
        return {
            nome: Joi.string().required().min(3).max(80),
            sobrenome: Joi.string().required().min(3).max(80),
            tipo: Joi.string().valid('C', 'E', 'F'),
            status: Joi.boolean()
        };
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: 'int' }),
        __metadata("design:type", Number)
    ], Pessoa.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar' }),
        __metadata("design:type", String)
    ], Pessoa.prototype, "nome", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar' }),
        __metadata("design:type", String)
    ], Pessoa.prototype, "sobrenome", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Pessoa.prototype, "tipo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Pessoa.prototype, "status", void 0);
    Pessoa = __decorate([
        typeorm_1.Entity()
    ], Pessoa);
    return Pessoa;
}());
exports.Pessoa = Pessoa;
