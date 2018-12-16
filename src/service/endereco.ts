import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';
import { Endereco } from '../models';

export class EnderecoService {
    public async getById(id: number): Promise<Endereco> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Endereco).findOne(id);
    }

    public async create(endereco: Endereco): Promise<Endereco> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Endereco).save(endereco);
    }

    public async list(): Promise<Endereco[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Endereco).find({ relations: ['bairro', 'pessoa']});
    }

    public async update(endereco: Endereco): Promise<Endereco> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(Endereco);
        const entity = await repo.findOne(endereco.id);
        entity.logradouro = endereco.logradouro;
        entity.cep = endereco.cep;
        entity.status =  endereco.status;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Endereco).delete(id);
    }
}

export const enderecoService = new EnderecoService();