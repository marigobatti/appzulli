import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';
import { EncomendaData } from '../models';

export class EncomendaDataService {
    public async getById(id: number): Promise<EncomendaData> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(EncomendaData).findOne(id);
    }

    public async create(encomendaData: EncomendaData): Promise<EncomendaData> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(EncomendaData).save(encomendaData);
    }

    public async list(): Promise<EncomendaData[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(EncomendaData).find({ relations: ['encomenda', 'tipoData'] });
    }

    public async update(encomendaData: EncomendaData): Promise<EncomendaData> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(EncomendaData);
        const entity = await repo.findOne(encomendaData.id);
        entity.data = encomendaData.data;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(EncomendaData).delete(id);
    }
}

export const encomendaDataService = new EncomendaDataService();