import { UserEntity } from '../entity/user.entity';
import { User } from '../utils/types';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { ProductEntity } from '../entity/product.entity';
import { CartEntity } from '../entity/cart.entity';
export declare class UsersService {
    private usersRepository;
    private authService;
    private productsRepository;
    private cartRepository;
    constructor(usersRepository: Repository<UserEntity>, authService: AuthService, productsRepository: Repository<ProductEntity>, cartRepository: Repository<CartEntity>);
    signUp(user: User): Promise<any>;
    login(reqUser: User): Promise<any>;
    getCart(userId: string): Promise<any>;
    updateCart(userId: string, cartItems: any): Promise<any>;
    addToCart(userId: string, cartItem: any): Promise<any>;
}
