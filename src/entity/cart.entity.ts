import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";


@Entity({name: 'Cart'})
export class CartEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('jsonb')
    cartItems: { item: ProductEntity, count: number} [];

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToOne(() => UserEntity, (user: UserEntity) => user.cart)
    public user: UserEntity;

}