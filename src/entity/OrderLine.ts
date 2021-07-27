import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export default class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    quantity: number;

    @Column({
        scale: 2,
        nullable: false
    })
    price: string;
};