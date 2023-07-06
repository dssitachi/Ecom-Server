import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig)
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy ],
  exports: [ AuthService ]
})
export class AuthModule {}
