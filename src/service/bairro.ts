import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';
import { Bairro } from '../models';

export class BairroService {
    public async getById(id: number): Promise<Bairro> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Bairro).findOne(id);
    }

    public async create(bairro: Bairro): Promise<Bairro> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Bairro).save(bairro);
    }

    public async list(): Promise<Bairro[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Bairro).find({ relations: ['cidade'] });
    }

    public async update(bairro: Bairro): Promise<Bairro> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(Bairro);
        const entity = await repo.findOne(bairro.id);
        entity.descricao = bairro.descricao;
        entity.status =  bairro.status;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Bairro).delete(id);
    }
}

export const bairroService = new BairroService();