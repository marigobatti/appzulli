import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import * as Joi from 'joi';

@Entity()
export class Pessoa {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'varchar'})
    public nome: string;

    @Column({type: 'varchar'})
    public sobrenome: string;

    @Column()
    public tipo: string;

    @Column()
    public status: boolean;

    public static getSchema() {
        return {
            nome: Joi.string().required().min(3).max(80),
            sobrenome: Joi.string().required().min(3).max(80),
            tipo: Joi.string().valid('C', 'E', 'F'),
            status: Joi.boolean()
        };
    }
}