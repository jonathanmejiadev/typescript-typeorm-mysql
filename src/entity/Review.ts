import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Product from './Product';

@Entity()
export default class ReviewEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"],
        nullable: false
    })
    stars: string;

    @Column({
        length: 150
    })
    title: string;

    @Column({
        nullable: false
    })
    description: string

    @Column()
    productId: number;

    @ManyToOne(() => Product, product => product.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'productId' })
    product: Product;
};