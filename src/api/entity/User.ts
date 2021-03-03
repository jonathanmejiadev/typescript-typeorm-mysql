import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import Product from './Product';
import { hash, compare, genSalt } from 'bcryptjs';

export interface IUser {
    username: string;
    email: string;
    password: string;
    roles: string[];
    products: Product[];
}

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

    @Column("simple-array")
    roles: string[];

    @OneToMany(() => Product, product => product.owner)
    products: Product[];

    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(10);
        return hash(password, salt);
    };

    async validatePassword(password: string): Promise<boolean> {
        return await compare(password, this.password);
    }
};