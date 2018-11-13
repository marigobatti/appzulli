import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index } from 'typeorm';
import * as Joi from 'joi';

@Entity()
export class Estado {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'varchar'})
    public descricao: string;

    @Column({type: 'varchar'})
    public sigla: string;

    @Column()
    public status: boolean;

    public static getSchema() {
        return {
            descricao: Joi.string(),
            sigla: Joi.string().max(80),
            status: Joi.boolean()
        };
    }
}