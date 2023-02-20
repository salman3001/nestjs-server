import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
