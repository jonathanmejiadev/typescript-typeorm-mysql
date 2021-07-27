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

    @Column({
        nullable: false
    })
    username: string;

    @Column({
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @Column({
        nullable: false
    })
    firstName: string;

    @Column({
        nullable: false
    })
    lastName: string;

    @Column({
        nullable: true
    })
    avatar: string;

    @Column('boolean', {
        default: false
    })
    confirmed: boolean;

    @Column("simple-array")
    roles: string[];

    @Column({
        default: 0,
        nullable: false
    })
    wallet: number;

    @OneToMany(() => Product, product => product.owner)
    products: Product[];
};