import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, User } from 'src/utils/types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @Post('/signup')
    async signUp(@Body() user: User):Promise<ApiResponse> {
        return await this.userService.signUp(user)
    }

    @Post('/login')
    async login(@Body() user: User):Promise<ApiResponse> {
        return await this.userService.login(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/cart')
    async getUserCart():Promise<any> {
        return await Promise.resolve(3);
    }

}
