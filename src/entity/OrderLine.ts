import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';
import Order from './Order';

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
    price: number;

    @ManyToOne(() => Order, order => order.orderLines, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' })
    orderId: Order;
};