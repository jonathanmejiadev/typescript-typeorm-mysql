import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import User from './User';
import OrderLine from './OrderLine';

export enum Status {
    ADMIN = "admin",
    EDITOR = "editor",
    GHOST = "ghost"
}

@Entity()
export default class OrderEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        scale: 2
    })
    total: number;

    @Column({
        type: "enum",
        enum: ['on_cart', 'created', 'processing', 'completed', 'cancelled'],
        nullable: false
    })
    status: Status

    @Column({
        default: 0
    })
    payment_id: number

    @Column({
        default: ''
    })
    payment_status: string

    @Column({
        default: 0
    })
    merchant_order_id: number;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @OneToMany(() => OrderLine, order => order.orderId)
    orderLines: OrderLine[];
};