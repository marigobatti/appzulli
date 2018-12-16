import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';
import { Encomenda, CorpoEncomenda } from '../models';
import { corpoEncomendaService } from './corpoEncomenda';

export class EncomendaService {
    public async getById(id: number): Promise<Encomenda> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Encomenda).findOne(id);
    }

    public async create(encomenda: Encomenda): Promise<Encomenda> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Encomenda).save(encomenda);
    }

    public async list(): Promise<Encomenda[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Encomenda).find(
            { relations: ['pessoa', 'sacola', 'sacola.produto'] });
    }

    public async update(encomenda: Encomenda): Promise<Encomenda> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(Encomenda);
        const entity = await repo.findOne(encomenda.id);
        entity.sku = encomenda.sku;
        entity.data =  encomenda.data;
        entity.total = encomenda.total;
        entity.cancelada = encomenda.cancelada;
        entity.pessoa = encomenda.pessoa;
        entity.sacola = encomenda.sacola;
        entity.status = encomenda.status;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Encomenda).delete(id);
    }
}

export const encomendaService = new EncomendaService();