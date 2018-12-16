import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Index, OneToMany, ManyToOne } from 'typeorm';
import * as Joi from 'joi';
import { Pessoa } from './';
import { EncomendaData } from './';
import { CorpoEncomenda } from './';

@Entity()
export class Encomenda {
    @PrimaryGeneratedColumn({type: 'int'})
    public id: number;

    @Column({type: 'varchar'})
    public sku: string;

    @Column({type: 'date', default: new Date()})
    public data: Date;

    @Column({type: 'date', default: new Date()})
    public dataRetirada: Date;

    @Column({type: 'float', nullable: true})
    public total: number;

    @Column({type: 'boolean', default: false})
    public cancelada: boolean;

    @ManyToOne(type => Pessoa, (pessoa) => pessoa.encomendas)
    @JoinColumn({ name: 'pessoaId' })
    public pessoa: Pessoa;

    @Column({ nullable: false })
    public pessoaId: number;

  //  @OneToOne(type => Pessoa)
  //  @JoinColumn()
  //  public atendente: Pessoa;

    @OneToMany(type => CorpoEncomenda, (corpos) => corpos.encomenda)
    public sacola: CorpoEncomenda[];

    @Column({type: 'varchar', default: 'aberta'})
    public status: string;

    public static getSchema() {
        return {
            numero: Joi.string(),
            status: Joi.boolean()
        };
    }
}