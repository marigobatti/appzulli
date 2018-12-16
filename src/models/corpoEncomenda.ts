import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index, OneToMany, ManyToOne } from 'typeorm';
import * as Joi from 'joi';
import { Encomenda } from './';
import { Produto } from './';

@Entity()
export class CorpoEncomenda {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'float'})
    public quantidade: number;

    @ManyToOne(type => Encomenda, (encomenda) => encomenda.corpos)
    public encomenda: Encomenda;

    @ManyToOne(type => Produto, (produto) => produto.corpos)
    @JoinColumn({ name: 'produtoId' })
    public produto: Produto;

    @Column({ nullable: false })
    public produtoId: number;

    @Column({type: 'boolean', default: true})
    public status: boolean;

    public static getSchema() {
        return {
            quantidade: Joi.number(),
            status: Joi.boolean()
        };
    }
}