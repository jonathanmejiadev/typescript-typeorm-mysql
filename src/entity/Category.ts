import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToMany, JoinTable } from 'typeorm';

import Product from './Product';

@Entity()
export default class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true,
    })
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Product, product => product.categories)
    products: Product[];

};