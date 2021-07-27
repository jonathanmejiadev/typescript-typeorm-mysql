import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';

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

    })
    total: number;

    @Column({
        type: "enum",
        enum: Status,
        nullable: false
    })
    status: Status

    @Column({
        default: 0
    })
    payment_id: string

    @Column({
        default: ''
    })
    payment_status: string

    @Column({
        default: 0
    })
    merchant_order_id: number;
};