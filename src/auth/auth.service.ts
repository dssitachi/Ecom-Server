import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService) {}

    async signIn(username: string, password: string): Promise<any> {
        return "";
    }

}
