import { Pessoa } from '../models/pessoa';
import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';

export class PessoaService {
    public async getById(id: number): Promise<Pessoa> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Pessoa).findOne(id);
    }

    public async create(pessoa: Pessoa): Promise<Pessoa> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Pessoa).save(pessoa);
    }

    public async list(): Promise<Pessoa[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Pessoa).find();
    }

    public async update(pessoa: Pessoa): Promise<Pessoa> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(Pessoa);
        const entity = await repo.findOne(pessoa.id);
        entity.nome = pessoa.nome;
        entity.tipo = pessoa.tipo;
        entity.status =  pessoa.status;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Pessoa).delete(id);
    }
}

export const pessoaService = new PessoaService();