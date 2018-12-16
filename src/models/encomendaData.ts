import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index, OneToMany, ManyToOne } from 'typeorm';
import * as Joi from 'joi';
import { Encomenda } from './';
import { TipoData } from './';

@Entity()
export class EncomendaData {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'date'})
    public data: Date;

    @ManyToOne(type => Encomenda, (encomenda) => encomenda.datas)
    public encomenda: Encomenda;

    @ManyToOne(type => TipoData, (tipoData) => tipoData.encomendaDatas)
    public tipoData: TipoData;

    public static getSchema() {
        return {
            data: Joi.date()
        };
    }
}