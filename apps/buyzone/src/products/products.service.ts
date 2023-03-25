import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productDocument, Product } from './schema/product.schema';
import * as fs from 'fs';
import * as path from 'path';
import pathModule from '../config/path.config';
import {
  IMatch,
  IPriceRange,
  IProductQuery,
} from './interface/IProductQuery.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name, 'buyzone')
    private readonly Product: Model<productDocument>,
  ) {}

  async create(body: CreateProductDto, files: Express.Multer.File[]) {
    const { imageAbsolutePaths, imageRelativePaths } =
      this.getImageAbsoluteAndRelativePaths(files);

    const product = await this.Product.create({
      images: [...imageRelativePaths],
      ...body,
    });
    if (!product) {
      this.deleteUploadedImage(imageAbsolutePaths);
      throw new HttpException(
        'Failed to add product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      return product;
    }
  }

  async findAll(productQuery: IProductQuery) {
    const {
      search,
      category,
      priceStart = '0',
      priceEnd = '10000000',
      inStock = 'true',
      pageLimit = '20',
      pageSkip = '0',
      sortPrice = '1',
      sortDate = '1',
    } = productQuery;

    const match: IMatch = {};
    if (category != null) match.category = category;
    if (search != null) match.name = new RegExp(search, 'i');

    if (inStock === 'true') {
      match.inStock = { $gt: 0 };
    } else if (inStock === 'false') {
      match.inStock = { $gte: 0 };
    } else {
      match.inStock = { $gt: 0 };
    }

    const priceRang: IPriceRange = {
      $and: [
        { price: { $gte: Number(priceStart) } },
        { price: { $lte: Number(priceEnd) } },
      ],
    };

    if (priceStart != null) priceRang.$and[0].price.$gte = Number(priceStart);
    if (priceEnd != null) priceRang.$and[1].price.$lte = Number(priceEnd);

    const sort: { price?: number; updatedAt?: number } = {};
    if (sortPrice != null) sort.price = Number(sortPrice);
    if (sortDate != null) sort.updatedAt = Number(sortDate);

    return await this.Product.find({ ...match, ...priceRang })
      .limit(Number(pageLimit))
      .skip(Number(pageLimit) * Number(pageSkip))
      .sort({ ...(sort as { price: -1 | 1; updateAt: -1 | 1 }) });
  }

  async findOne(id: string) {
    return await this.Product.findById(id);
  }

  async update(
    id: string,
    body: UpdateProductDto,
    files: Express.Multer.File[],
  ) {
    const { imageAbsolutePaths, imageRelativePaths } =
      this.getImageAbsoluteAndRelativePaths(files);

    const oldProduct = await this.Product.findById(id);

    if (!oldProduct) {
      throw new HttpException(
        'this product doesnt exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedProduct = await this.Product.findByIdAndUpdate(
      id,
      {
        ...body,
        images: [...imageRelativePaths],
      },
      { new: true },
    );

    if (!updatedProduct) {
      this.deleteUploadedImage(imageAbsolutePaths);
      throw new HttpException(
        'Failed to update product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const { images: oldImages } = oldProduct;
    if (oldImages != null && oldImages.length > 0) {
      this.deleteUploadedImage(oldImages, 'relative');
    }

    return updatedProduct;
  }

  async remove(id: string) {
    const deletedProduct = await this.Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new HttpException(
        'unable to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else {
      this.deleteUploadedImage(deletedProduct.images, 'relative');
      return deletedProduct;
    }
  }

  async incrementReview(id: string, totalStars: number) {
    const updatedProduct = await this.Product.findByIdAndUpdate(
      id,
      {
        $inc: { totalReviews: 1, totalStars: totalStars },
      },
      { new: true },
    );

    if (!updatedProduct) {
      throw new InternalServerErrorException('failed to add review');
    }

    return updatedProduct;
  }

  async decrementReview(productId: string, totalStars: number) {
    const updatedProduct = await this.Product.findByIdAndUpdate(
      productId,
      {
        $inc: { totalReviews: -1, totalStars: -totalStars },
      },
      { new: true },
    );

    if (!updatedProduct) {
      throw new InternalServerErrorException('failed to add review');
    }

    return updatedProduct;
  }
  //Helper functions below

  deleteUploadedImage(uploadedImagePaths: string[], pathType?: 'relative') {
    if (pathType === 'relative' && uploadedImagePaths.length > 0) {
      uploadedImagePaths.forEach((imagePath) => {
        fs.unlink(path.join(pathModule.root, 'uploads', imagePath), (err) => {
          if (err) {
            console.log(`failed to delete image at path "${imagePath}"`);
            console.log(err);
          }
        });
      });
    } else if (uploadedImagePaths.length > 0) {
      uploadedImagePaths.forEach((imagePath) => {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.log(`failed to delete image at path "${imagePath}"`);
          }
        });
      });
    }
  }

  getImageAbsoluteAndRelativePaths(files: Express.Multer.File[]) {
    let imageAbsolutePaths: string[] = [];
    let imageRelativePaths: string[] = [];

    if (files != null) {
      imageAbsolutePaths = files.map((file) => file.path);
      imageRelativePaths = files.map((file) => file.path.split('uploads/')[1]);

      return {
        imageAbsolutePaths,
        imageRelativePaths,
      };
    } else {
      return {
        imageAbsolutePaths,
        imageRelativePaths,
      };
    }
  }
}
