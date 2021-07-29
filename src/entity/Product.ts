import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import User from './User';
import Review from './Review';
import Category from './Category';

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

    @Column({ nullable: false })
    stock: number;

    @Column({ nullable: false })
    price: number;

    @Column("simple-array")
    images: string[];

    @OneToMany(() => Review, review => review.productId)
    reviews: Review[];

    @ManyToMany(() => Category, { cascade: true })
    @JoinTable()
    categories: Category[];
};