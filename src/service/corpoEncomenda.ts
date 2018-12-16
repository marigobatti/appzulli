import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';
import { CorpoEncomenda } from '../models';

export class CorpoEncomendaService {
    public async getById(id: number): Promise<CorpoEncomenda> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(CorpoEncomenda).findOne(id);
    }

    public async create(corpoEncomenda: CorpoEncomenda): Promise<CorpoEncomenda> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(CorpoEncomenda).save(corpoEncomenda);
    }

    public async list(): Promise<CorpoEncomenda[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(CorpoEncomenda).find({ relations: ['encomenda', 'produto'] });
    }

    public async update(corpoEncomenda: CorpoEncomenda): Promise<CorpoEncomenda> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(CorpoEncomenda);
        const entity = await repo.findOne(corpoEncomenda.id);
        entity.encomenda = corpoEncomenda.encomenda;
        entity.quantidade = corpoEncomenda.quantidade;
        entity.status =  corpoEncomenda.status;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(CorpoEncomenda).delete(id);
    }
}

export const corpoEncomendaService = new CorpoEncomendaService();