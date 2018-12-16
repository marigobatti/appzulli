import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';
import { Produto } from '../models';

export class ProdutoService {
    public async getById(id: number): Promise<Produto> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Produto).findOne(id);
    }

    public async create(produto: Produto): Promise<Produto> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Produto).save(produto);
    }

    public async list(): Promise<Produto[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Produto).find();
    }

    public async update(produto: Produto): Promise<Produto> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(Produto);
        const entity = await repo.findOne(produto.id);
        entity.sku = produto.sku;
        entity.titulo = produto.titulo;
        entity.descricao = produto.descricao;
        entity.estilo = produto.estilo;
        entity.preco = produto.preco;
        entity.moeda = produto.moeda;
        entity.formatoMoeda = produto.formatoMoeda;
        entity.medida = produto.medida;
        entity.novidade = produto.novidade;
        entity.estoque = produto.estoque;
        entity.tipoCarne = produto.tipoCarne;
        entity.status =  produto.status;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Produto).delete(id);
    }
}

export const produtoService = new ProdutoService();