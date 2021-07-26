import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity()
export default class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    stock: number;

    @Column()
    price: number;

    @Column("simple-array")
    images: string[];

    @Column()
    ownerId: number;

    @ManyToOne(() => User, user => user.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ownerId' })
    owner: User;
};