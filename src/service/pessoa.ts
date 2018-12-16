import { Pessoa } from '../models';
import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';

export class PessoaService {
    public async getById(id: number): Promise<Pessoa> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Pessoa).findOne(id);
    }

    public async create(pessoa: Pessoa): Promise<Pessoa> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Pessoa).save(pessoa);
    }

    public async list(): Promise<Pessoa[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Pessoa).find({ relations: ['usuario']});
    }

    public async update(pessoa: Pessoa): Promise<Pessoa> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(Pessoa);
        const entity = await repo.findOne(pessoa.id);
        entity.nome = pessoa.nome;
        entity.sobrenome = pessoa.sobrenome;
        entity.email = pessoa.email;
        entity.endereco = pessoa.endereco;
        entity.cep = pessoa.cep;
        entity.cidade = pessoa.cidade;
        entity.dataNascimento = pessoa.dataNascimento;
        entity.primeiraVisita = pessoa.primeiraVisita;
        entity.ultimaVisita = pessoa.ultimaVisita;
        entity.ultimaEncomenda = pessoa.ultimaEncomenda;
        entity.encomendou = pessoa.encomendou;
        entity.numEncomendas = pessoa.numEncomendas;
        entity.totalGasto = pessoa.totalGasto;
        entity.status =  pessoa.status;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Pessoa).delete(id);
    }
}

export const pessoaService = new PessoaService();