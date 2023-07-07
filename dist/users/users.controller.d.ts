import { UsersService } from './users.service';
import { ApiResponse, User } from '../utils/types';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    signUp(user: User): Promise<ApiResponse>;
    login(user: User): Promise<ApiResponse>;
    getUserCart(req: any): Promise<any>;
    updateCart(req: any, cartItems: {
        productId: string;
        count: number;
    }[]): Promise<any>;
    addToCart(req: any, cartItem: {
        productId: string;
        count: number;
    }): Promise<any>;
}
