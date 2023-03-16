import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BuyzoneController } from './buyzone.controller';
import { BuyzoneService } from './buyzone.service';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.BUYZONE_DB_URI, {
      dbName: 'buyzone',
      connectionName: 'buyzone',
    }),
    UserModule,
    AuthModule,
    ProductsModule,
    ReviewsModule,
    OrdersModule,
    RouterModule.register([
      {
        path: 'buyzone/users',
        module: UserModule,
      },
      {
        path: 'buyzone/auth',
        module: AuthModule,
      },
      {
        path: 'buyzone/products',
        module: ProductsModule,
      },
      {
        path: 'buyzone/reviews',
        module: ReviewsModule,
      },
      {
        path: 'buyzone/orders',
        module: OrdersModule,
      },
    ]),
  ],
  controllers: [BuyzoneController],
  providers: [BuyzoneService],
})
export class BuyzoneModule {}
