import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index, OneToMany, ManyToOne } from 'typeorm';
import * as Joi from 'joi';
import { ProdutoValor } from './';

@Entity()
export class TipoValor {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'varchar'})
    public descricao: string;

    @Column({type: 'varchar'})
    public nome: string;

  //  @OneToMany(type => ProdutoValor, (valores) => valores.produto)
  //  public produtosValores: ProdutoValor[];

    public static getSchema() {
        return {
            descricao: Joi.string(),
            nome: Joi.string()
        };
    }
}