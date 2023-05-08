import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { User } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
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
}
