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
        type: 'decimal', precision: 10, scale: 2, nullable: false, transformer: {
            to(value) {
                return value;
            },
            from(value) {
                return parseFloat(value);
            }
        }
    })
    pricePerUnit: number;

    @Column({
        type: 'decimal', precision: 10, scale: 2, nullable: false, transformer: {
            to(value) {
                return value;
            },
            from(value) {
                return parseFloat(value);
            }
        }
    })
    totalPrice: number;

    @ManyToOne(() => Order, order => order.orderLines, { onDelete: 'CASCADE' })
    @JoinColumn()
    order: Order;

    @Column()
    productId: number;

    @OneToOne(() => Product, { eager: true })
    @JoinColumn({ name: 'productId' })
    product: Product;
};