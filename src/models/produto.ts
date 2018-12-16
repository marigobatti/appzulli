import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index, OneToMany, ManyToOne } from 'typeorm';
import * as Joi from 'joi';
import { CorpoEncomenda } from '.';
import { ProdutoValor } from '.';

@Entity()
export class Produto {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Index({ unique: true })
    @Column({type: 'varchar'})
    public sku: string;

    @Column({type: 'varchar'})
    public titulo: string;

    @Column({type: 'varchar'})
    public descricao: string;

    @Column({type: 'varchar'})
    public estilo: string;

    @Column({type: 'float'})
    public preco: number;

    @Column({type: 'varchar', default: 'BRL'})
    public moeda: string;

    @Column({type: 'varchar', default: 'R$'})
    public formatoMoeda: string;

    @Column({type: 'varchar'})
    public medida: string;

    @Column({type: 'boolean', default: true})
    public novidade: boolean;

    @Column({type: 'float'})
    public estoque: number;

    @Column({type: 'varchar'})
    public tipoCarne: string;

    @OneToMany(type => CorpoEncomenda, (corpos) => corpos.produto)
    public corpos: CorpoEncomenda[];

    @Column({type: 'boolean', default: true})
    public status: boolean;

    public static getSchema() {
        return {
            quantidade: Joi.number(),
            tipoCarne: Joi.string().valid('Frango', 'Bovino', 'Suino'),
            status: Joi.boolean()
        };
    }
}