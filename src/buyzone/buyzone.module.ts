import { Module } from '@nestjs/common';
import { BuyzoneService } from './buyzone.service';
import { BuyzoneController } from './buyzone.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [BuyzoneController],
  providers: [BuyzoneService],
  imports: [UserModule, AuthModule],
})
export class BuyzoneModule {}
