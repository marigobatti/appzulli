import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index, OneToMany } from 'typeorm';
import * as Joi from 'joi';
import { Endereco } from './';
import { Usuario } from './';
import { Encomenda } from './encomenda';

@Entity()
export class Pessoa {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'varchar'})
    public nome: string;

    @Column({type: 'varchar'})
    public sobrenome: string;

    @Column({type: 'varchar'})
    public email: string;

    @Column({type: 'varchar'})
    public endereco: string;

    @Column({type: 'varchar'})
    public cep: string;

    @Column({type: 'varchar'})
    public cidade: string;

    @Column({type: 'date'})
    public dataNascimento: Date;

    @Column({type: 'date', default: new Date()})
    public primeiraVisita: Date;

    @Column({type: 'date'})
    public ultimaVisita: Date;

    @Column({type: 'date', nullable: true})
    public ultimaEncomenda: Date;

    @Column({type: 'boolean', default: false})
    public encomendou: boolean;

    @Column({type: 'float', nullable: true})
    public numEncomendas: number;

    @Column({type: 'float', nullable: true})
    public totalGasto: number;

    @OneToOne(type => Usuario)
    @JoinColumn()
    public usuario: Usuario;

    @OneToMany(type => Encomenda, (encomenda) => encomenda.pessoa)
    @JoinColumn()
    public encomendas: Encomenda[];

    @Column({type: 'boolean', default: true})
    public status: boolean;

    public static getSchema() {
        return {
            nome: Joi.string().min(3).max(80),
            sobrenome: Joi.string().min(3).max(80),
            status: Joi.boolean()
        };
    }
}