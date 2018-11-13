"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../database");
exports.Config = {
    /** Chave secreta. */
    secret: 'p36nSHjMKdqrgAZeF5sHgCjbV5vMXMt8',
    connection: database_1.DatabaseProvider.getConnection()
};
