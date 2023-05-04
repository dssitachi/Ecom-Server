import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    img: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    category: string;

    @CreateDateColumn({ type: "timestamptz", default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @CreateDateColumn({ type: "timestamptz", default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}