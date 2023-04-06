import { Module } from '@nestjs/common';
import { BuyzoneModule } from 'apps/buyzone/src/buyzone.module';
import { EmailServerModule } from 'apps/email-server/src/email-server.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BuyzoneModule, EmailServerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
