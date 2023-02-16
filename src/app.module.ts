import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuyzoneModule } from './buyzone/buyzone.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.BUYZONE_DB_URI, {
      dbName: 'buyzone',
      connectionName: 'buyzone',
    }),
    BuyzoneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
