import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { User } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { ProductEntity } from 'src/entity/product.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private authService: AuthService,
        @InjectRepository(ProductEntity)
        private productsRepository: Repository<ProductEntity>
    ) { }

    async signUp(user: User): Promise<any> {
        var checkExistingEmail = await this.usersRepository.findOne({where: {email: user.email} });
        if(checkExistingEmail)
            throw new BadRequestException("User with provided email id already exists");
        var newUser = new UserEntity();
        newUser.email = user.email;
        newUser.password = user.password;
        await this.usersRepository.save(newUser);
        return {
            user: {
                email: user.email
            }
        }
        
    }

    async login(reqUser: User): Promise<any> {
        var user = await this.usersRepository.findOne({ where: {email: reqUser.email} });
        if(!user) {
            throw new UnauthorizedException("Incorrect email or password");
        }
        if(!(await bcrypt.compare(reqUser.password, user.password))) {
            throw new UnauthorizedException("Incorrect email or password");
        }
        return this.authService.generateAccessToken(user)
        
    }

    /**
     * 
     * @param userId 
     * @param cartItem would be of type { productId: string and count : number}
     */
    async updateCart(userId: string, cartItems: any): Promise<any> {
        const user = await this.usersRepository.findOne({ where: {id: userId} });
        if(!user) {
            throw new UnauthorizedException("Invalid Credentials");
        }
        var cart = [];
        cartItems.forEach(async function updateCartInDatabase({ productId, count }) {
            var product = await this.productsRepository.findOne({ where: {id: productId }});
            if(product) {
                cart.push({item: product, count})
            }
        })

        user.cart.cartItems = cart;
        await this.usersRepository.save(user);
        return {
            cart,
            message: 'Cart Updated'
        }
    }




}
