import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index, OneToMany, ManyToOne } from 'typeorm';
import * as Joi from 'joi';
import { EncomendaData } from './';

@Entity()
export class TipoData {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'varchar'})
    public descricao: string;

    @Column({type: 'varchar'})
    public nome: string;

    @OneToMany(type => EncomendaData, (datas) => datas.tipoData)
    public encomendaDatas: EncomendaData[];

    public static getSchema() {
        return {
            descricao: Joi.string(),
            nome: Joi.string()
        };
    }
}