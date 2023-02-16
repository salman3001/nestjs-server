import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuyzoneModule } from './buyzone/buyzone.module';

@Module({
  imports: [BuyzoneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
