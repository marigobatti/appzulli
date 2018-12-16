import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index, ManyToOne } from 'typeorm';
import * as Joi from 'joi';
import { Bairro } from './';
import { Pessoa } from './';

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'varchar'})
    public logradouro: string;

    @OneToOne(type => Bairro)
    @JoinColumn()
    public bairro: Bairro;

    @Column({type: 'int'})
    public cep: number;

 //   @ManyToOne(type => Pessoa, (pessoa) => pessoa.enderecos)
 //   public pessoa: Pessoa;

    @Column({type: 'boolean', default: true})
    public status: boolean;

    public static getSchema() {
        return {
            logradouro: Joi.string(),
            cep: Joi.number().max(8),
            status: Joi.boolean()
        };
    }
}