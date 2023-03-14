import { Module } from '@nestjs/common';
import { BuyzoneModule } from 'apps/buyzone/src/buyzone.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BuyzoneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
