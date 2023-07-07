import { CartEntity } from "./cart.entity";
export declare class UserEntity {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    cart: CartEntity;
    hashPassword(password: string): Promise<void>;
}
