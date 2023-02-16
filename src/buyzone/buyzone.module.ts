import { Module } from '@nestjs/common';
import { BuyzoneService } from './buyzone.service';
import { BuyzoneController } from './buyzone.controller';

@Module({
  controllers: [BuyzoneController],
  providers: [BuyzoneService],
})
export class BuyzoneModule {}
