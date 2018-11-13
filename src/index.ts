import { ApiServer } from './server';
import { DatabaseProvider } from './database';

DatabaseProvider.configure({
    type: 'postgres',
    host: process.env.DATABASE_TYPE as any || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'admin',
    database: process.env.DATABASE_NAME || 'testeapi',
    ssl: !!process.env.USE_SSL
});

const server = new ApiServer();
server.start(+process.env.PORT || 8888);