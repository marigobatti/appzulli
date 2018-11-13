import { DatabaseProvider } from '../database';

export const Config = {
    /** Chave secreta. */
    secret: 'p36nSHjMKdqrgAZeF5sHgCjbV5vMXMt8',
    connection: DatabaseProvider.getConnection()
};