import { Column, PrimaryGeneratedColumn, BaseEntity, Entity, ManyToOne, JoinColumn } from 'typeorm';

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
};