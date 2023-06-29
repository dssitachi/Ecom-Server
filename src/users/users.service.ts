import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { User } from '../utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { ProductEntity } from '../entity/product.entity';
import { CartEntity } from '../entity/cart.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private authService: AuthService,
        @InjectRepository(ProductEntity)
        private productsRepository: Repository<ProductEntity>,
        @InjectRepository(CartEntity)
        private cartRepository: Repository<CartEntity>,
    ) { }

    async signUp(user: User): Promise<any> {
        var checkExistingEmail = await this.usersRepository.findOne({ where: { email: user.email } });
        if (checkExistingEmail)
            throw new BadRequestException("User with provided email id already exists");
        var newUser = new UserEntity();
        var cart = new CartEntity();
        cart.cartItems = [];
        cart.user = newUser;
        await this.cartRepository.save(cart);
        newUser.email = user.email;
        newUser.password = user.password;
        newUser.cart = cart;
        await this.usersRepository.save(newUser);
        return this.authService.generateAccessToken(user);

    }

    async login(reqUser: User): Promise<any> {
        var user = await this.usersRepository.findOne({ where: { email: reqUser.email } });
        if (!user) {
            throw new UnauthorizedException("Incorrect email or password");
        }
        if (!(await bcrypt.compare(reqUser.password, user.password))) {
            throw new UnauthorizedException("Incorrect email or password");
        }
        return this.authService.generateAccessToken(user)

    }

    
    async getCart(userId: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new UnauthorizedException("Invalid Credentials");
        }
        return user.cart.cartItems;
    }

    async updateCart(userId: string, cartItems: any): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new UnauthorizedException("Invalid Credentials");
        }
        var cart = [];
        cartItems.forEach(async ({ productId, count }) => {
            var product = await this.productsRepository.findOne({ where: { id: productId } });
            if (product) {
                cart.push({ item: product, count })
            }
        })
        user.cart.cartItems = cart;
        await this.usersRepository.save(user);
        return {
            cart,
            message: 'Cart Updated'
        }
    }

    async addToCart(userId: string, cartItem: any): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new UnauthorizedException("Invalid Credentials");
        }
        var cart = user.cart.cartItems;
        var product = await this.productsRepository.findOne({ where: { id: cartItem.item.id } });
        if (product) {
            cart.push(cartItem);
        }
        // console.log(user)
        user.cart.cartItems = cart;
        await this.usersRepository.save(user);
        return {
            cart,
            message: 'Cart Updated'
        }
    }

}
