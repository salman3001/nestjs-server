import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'product', schema: productSchema }],
      'buyzone',
    ),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [
    MongooseModule.forFeature([{ name: 'product', schema: productSchema }]),
    ProductsService,
  ],
})
export class ProductsModule {}
