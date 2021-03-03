import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

export interface IProduct {
    name: string;
    stock: number;
    ownerId: number;
}

@Entity()
export default class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    stock: number;

    @Column()
    ownerId: number;

    @ManyToOne(() => User, user => user.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ownerId' })
    owner: User;
};