import { Module } from '@nestjs/common';
import { BuyzoneService } from './buyzone.service';
import { BuyzoneController } from './buyzone.controller';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';

@Module({
  controllers: [BuyzoneController],
  providers: [BuyzoneService],
  imports: [UserModule],
})
export class BuyzoneModule {}
