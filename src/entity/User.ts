import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import Product from './Product';

@Entity()
export default class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column('boolean', { default: false })
    confirmed: boolean;

    @Column("simple-array")
    roles: string[];

    @Column('number', { default: 0 })
    wallet: number;

    @OneToMany(() => Product, product => product.owner)
    products: Product[];
};