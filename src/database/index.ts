import { Connection, createConnection, Logger } from 'typeorm';
import { Bairro, Cidade, CorpoEncomenda,
         Encomenda, EncomendaData, Endereco,
         Estado, Produto, ProdutoValor, Pessoa,
         TipoData, TipoValor, Usuario } from '../models/';

export interface IDatabaseConfiguration {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;
}

export class DatabaseProvider {
    private static connection: Connection;
    private static configuration: IDatabaseConfiguration;

    public static configure(config: IDatabaseConfiguration): void {
        DatabaseProvider.configuration = config;
    }

    public static async getConnection(): Promise<Connection> {
        if (DatabaseProvider.connection)
            return DatabaseProvider.connection;

        const { type, host, port, username, password, database, ssl } = DatabaseProvider.configuration;
        DatabaseProvider.connection = await createConnection({
            type, host, port, username, password, database,
            extra: {
                ssl
            },
            entities: [ Bairro, Cidade, CorpoEncomenda,
                        Encomenda, EncomendaData, Endereco,
                        Estado, Produto, ProdutoValor, Pessoa,
                        TipoData, TipoValor, Usuario ],
            synchronize: false // DO NOT USE IN PRODUCTION!!!!!!
        });

        return DatabaseProvider.connection;
    }
}