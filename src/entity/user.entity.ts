import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CartEntity } from "./cart.entity";

@Entity({name: 'User'})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToOne(() => CartEntity,{
        eager: true,
        cascade: true
    })
    @JoinColumn()
    cart: CartEntity;

    @BeforeInsert()
    async hashPassword(password: string) {
        var salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(password || this.password, salt);
    }

}