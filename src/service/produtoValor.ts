import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';
import { ProdutoValor } from '../models';

export class ProdutoValorService {
    public async getById(id: number): Promise<ProdutoValor> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(ProdutoValor).findOne(id);
    }

    public async create(produtoValor: ProdutoValor): Promise<ProdutoValor> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(ProdutoValor).save(produtoValor);
    }

    public async list(): Promise<ProdutoValor[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(ProdutoValor).find({ relations: ['produto', 'tipoValor'] });
    }

    public async update(produtoValor: ProdutoValor): Promise<ProdutoValor> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(ProdutoValor);
        const entity = await repo.findOne(produtoValor.id);
        entity.descricao = produtoValor.descricao;
        entity.valor = produtoValor.valor;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(ProdutoValor).delete(id);
    }
}

export const produtoValorService = new ProdutoValorService();