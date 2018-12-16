import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';
import { TipoValor } from '../models';

export class TipoValorService {
    public async getById(id: number): Promise<TipoValor> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(TipoValor).findOne(id);
    }

    public async create(tipoValor: TipoValor): Promise<TipoValor> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(TipoValor).save(tipoValor);
    }

    public async list(): Promise<TipoValor[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(TipoValor).find();
    }

    public async update(tipoValor: TipoValor): Promise<TipoValor> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(TipoValor);
        const entity = await repo.findOne(tipoValor.id);
        entity.descricao = tipoValor.descricao;
        entity.nome = tipoValor.nome;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(TipoValor).delete(id);
    }
}

export const tipoValorService = new TipoValorService();