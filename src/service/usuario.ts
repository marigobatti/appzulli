import { Usuario } from '../models/usuario';
import { DatabaseProvider } from '../database';
import { DeleteResult } from 'typeorm';

const saltRounds = 15;

export class UsuarioService {

    public async create(usuario: Usuario): Promise<Usuario> {
        const connection = await DatabaseProvider.getConnection();
        const entity = new Usuario();
        entity.username = usuario.username;
        entity.email = usuario.email;
        entity.senha = usuario.senha;
        entity.funcao = usuario.funcao;
        entity.status = usuario.status;

        return await connection.getRepository(Usuario).save(entity);
    }

    public async list(): Promise<Usuario[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Usuario).find();
    }

    public async update(usuario: Usuario): Promise<Usuario> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(Usuario);
        const entity = await repo.findOne(usuario.id);
        entity.email = usuario.email;
        entity.senha = usuario.senha;
        entity.funcao = usuario.funcao;
        entity.status = usuario.status;
        return await repo.save(entity);
    }

    public async delete(username: string): Promise<DeleteResult> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Usuario).delete({ username });
    }

    public async getByUsername(username: string): Promise<Usuario> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Usuario).findOne({ username });
    }

    public async getByEmail(email: string): Promise<Usuario> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Usuario).findOne({ email });
    }
}

export const usuarioService = new UsuarioService();