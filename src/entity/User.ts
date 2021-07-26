import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import Product from './Product';

export enum UserRole {
    ADMIN = 'ADMIN',
    MODERATOR = 'MOD',
    USER = 'USER'
};

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

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    avatar: string;

    @Column('boolean', { default: false })
    confirmed: boolean;

    @Column("simple-array")
    roles: string[];

    @Column({ default: 0 })
    wallet: number;

    @OneToMany(() => Product, product => product.owner)
    products: Product[];
};