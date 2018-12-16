import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';
import { TipoData } from '../models';

export class TipoDataService {
    public async getById(id: number): Promise<TipoData> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(TipoData).findOne(id);
    }

    public async create(tipoData: TipoData): Promise<TipoData> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(TipoData).save(tipoData);
    }

    public async list(): Promise<TipoData[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(TipoData).find();
    }

    public async update(tipoData: TipoData): Promise<TipoData> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(TipoData);
        const entity = await repo.findOne(tipoData.id);
        entity.descricao = tipoData.descricao;
        entity.nome = tipoData.nome;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(TipoData).delete(id);
    }
}

export const tipoDataService = new TipoDataService();