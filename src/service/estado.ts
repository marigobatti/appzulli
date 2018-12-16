import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';
import { Estado } from '../models';

export class EstadoService {
    public async getById(id: number): Promise<Estado> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Estado).findOne(id);
    }

    public async create(estado: Estado): Promise<Estado> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Estado).save(estado);
    }

    public async list(): Promise<Estado[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Estado).find();
    }

    public async update(estado: Estado): Promise<Estado> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(Estado);
        const entity = await repo.findOne(estado.id);
        entity.descricao = estado.descricao;
        entity.sigla = estado.sigla;
        entity.status =  estado.status;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Estado).delete(id);
    }
}

export const estadoService = new EstadoService();