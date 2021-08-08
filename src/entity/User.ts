import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import Product from './Product';
import Order from './Order';

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
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        nullable: false,
        unique: true
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

    @Column({
        type: "enum",
        enum: ["USER", "MOD", "ADMIN"],
        nullable: false
    })
    role: string;

    @OneToMany(() => Order, order => order.userId)
    orders: Order[];
};