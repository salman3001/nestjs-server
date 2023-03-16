import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { IsEmailExistConstraint } from '../pipes/classValidatorPipes/isEmailExist';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }], 'buzone'),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
