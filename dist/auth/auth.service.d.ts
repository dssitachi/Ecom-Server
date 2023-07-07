import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateAccessToken(user: any): {
        access_token: string;
    };
}
