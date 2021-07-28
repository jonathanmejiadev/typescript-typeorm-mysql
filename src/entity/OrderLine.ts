import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import Order from './Order';
import Product from './Product'

@Entity()
export default class OrderLineEntity extends BaseEntity {
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
    @JoinColumn()
    order: Order;

    @Column()
    productId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;
};