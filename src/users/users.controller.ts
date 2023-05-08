import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, User } from 'src/utils/types';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @Post('/signup')
    async signUp(@Body() user: User):Promise<ApiResponse> {
        return await this.userService.signUp(user)
    }


}
