import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import * as Joi from 'joi';
import { Estado } from './';

@Entity()
export class Cidade {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'varchar'})
    public descricao: string;

    @OneToOne(type => Estado)
    @JoinColumn()
    public estado: Estado;

    @Column({type: 'boolean', default: true})
    public status: boolean;

    public static getSchema() {
        return {
            descricao: Joi.string(),
            status: Joi.boolean()
        };
    }
}