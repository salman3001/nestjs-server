import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from './schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Product.name, schema: productSchema }],
      'buyzone',
    ),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
