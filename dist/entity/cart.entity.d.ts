import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";
export declare class CartEntity {
    id: string;
    cartItems: {
        item: ProductEntity;
        count: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
}
