import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
        ) {}

    generateAccessToken(user: any) {
        console.log(user)
        return {
            access_token: this.jwtService.sign({
                sub: user.id
            })
        }
    }

}
