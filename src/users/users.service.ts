import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { User } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private authService: AuthService
    ) { }

    async signUp(user: User): Promise<any> {  
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
            throw new UnauthorizedException("Incorrect user details");
        }
        if(!(await bcrypt.compare(reqUser.password, user.password))) {
            throw new UnauthorizedException();
        }
        console.log(user)
        return this.authService.generateAccessToken(user)
        
    }

    async findUserByEmail(email: string): Promise<any> {
        return await this.usersRepository.find()
    }

}
