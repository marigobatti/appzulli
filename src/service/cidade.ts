import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';
import { Cidade } from '../models';

export class CidadeService {
    public async getById(id: number): Promise<Cidade> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Cidade).findOne(id);
    }

    public async create(cidade: Cidade): Promise<Cidade> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Cidade).save(cidade);
    }

    public async list(): Promise<Cidade[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Cidade).find({ relations: ['estado'] });
    }

    public async update(cidade: Cidade): Promise<Cidade> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(Cidade);
        const entity = await repo.findOne(cidade.id);
        entity.descricao = cidade.descricao;
        entity.status =  cidade.status;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Cidade).delete(id);
    }
}

export const cidadeService = new CidadeService();