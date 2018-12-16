import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import * as Joi from 'joi';
import { Cidade } from './';

@Entity()
export class Bairro {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'varchar'})
    public descricao: string;

    @OneToOne(type => Cidade)
    @JoinColumn()
    public cidade: Cidade;

    @Column({type: 'boolean', default: true})
    public status: boolean;

    public static getSchema() {
        return {
            descricao: Joi.string(),
            status: Joi.boolean()
        };
    }
}