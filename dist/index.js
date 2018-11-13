"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var database_1 = require("./database");
database_1.DatabaseProvider.configure({
    type: 'postgres',
    host: process.env.DATABASE_TYPE || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'admin',
    database: process.env.DATABASE_NAME || 'testeapi',
    ssl: !!process.env.USE_SSL
});
var server = new server_1.ApiServer();
server.start(+process.env.PORT || 8888);
