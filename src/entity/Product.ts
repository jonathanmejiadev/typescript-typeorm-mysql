import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';
import User from './User';

@Entity()
export default class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({ length: 2000 })
    description: string;

    @Column({ nullable: false, scale: 2 })
    stock: number;

    @Column({ nullable: false })
    price: number;

    @Column("simple-array")
    images: string[];

    @Column()
    ownerId: number;

    @ManyToOne(() => User, user => user.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ownerId' })
    owner: User;
};