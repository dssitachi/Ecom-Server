import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { CartEntity } from '../entity/cart.entity';
import { ProductEntity } from '../entity/product.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity, CartEntity, ProductEntity]),
		AuthModule
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule { }
