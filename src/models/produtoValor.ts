import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index, OneToMany, ManyToOne } from 'typeorm';
import * as Joi from 'joi';
import { TipoValor } from '.';
import { Produto } from '.';

@Entity()
export class ProdutoValor {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'varchar'})
    public descricao: string;

    @Column({type: 'float'})
    public valor: number;

//    @ManyToOne(type => Produto, (produto) => produto.valores)
//    public produto: Produto;

 //   @ManyToOne(type => TipoValor, (tipoValor) => tipoValor.produtosValores)
 //   public tipoValor: TipoValor;

    public static getSchema() {
        return {
            data: Joi.date()
        };
    }
}