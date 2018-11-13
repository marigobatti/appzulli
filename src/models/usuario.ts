import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index, BeforeInsert } from 'typeorm';
import { Pessoa } from './pessoa';
import * as Joi from 'joi';
import * as bcrypt from 'bcrypt-nodejs';
import { BadRequestError } from 'restify-errors';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Index({ unique: true })
    @Column({type: 'varchar'})
    public username: string;

    @Index({ unique: true })
    @Column({type: 'varchar'})
    public email: string;

    @Column({type: 'varchar', nullable: false})
    public senha: string;

    @Column({type: 'varchar', default: 'Cliente'})
    public funcao: string;

    @Column({ default: true })
    public status: boolean;

    @BeforeInsert()
    public async hashPassword() {
      await new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(this.senha, salt, null, (erro, hash) => {
                    if (erro) reject(erro);

                    resolve(hash);
                });
            });
        }).then((result) => this.senha = result.toString())
          .catch((err) => new BadRequestError().statusCode);
    }

    public static getSchema() {
        return {
            username: Joi.string().min(3).max(30),
            email: Joi.string().email(),
            senha: Joi.string().alphanum().min(6).max(30),
            funcao: Joi.string().valid('Cliente', 'Funcionário', 'Administrador'),
            status: Joi.boolean(),
            pessoaId: Joi.number(),
            pessoa: Joi.object(Pessoa.getSchema())
        };
    }
}
