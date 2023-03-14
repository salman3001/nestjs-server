import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { productDocument } from './schema/product.schema';
import * as fs from 'fs';
import * as path from 'path';
import pathModule from '../config/path.config';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product') private readonly Product: Model<productDocument>,
  ) {}

  async create(
    body: CreateProductDto,
    validationError: string[],
    files: Express.Multer.File[],
  ) {
    const { imageAbsolutePaths, imageRelativePaths } =
      this.getImageAbsoluteAndRelativePaths(files);

    this.checkFileValidationError(validationError, imageAbsolutePaths);

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

  async findAll() {
    return await this.Product.find();
  }

  async findOne(id: string) {
    return await this.Product.findById(id);
  }

  async update(
    id: string,
    body: UpdateProductDto,
    validationError: string[],
    files: Express.Multer.File[],
  ) {
    const { imageAbsolutePaths, imageRelativePaths } =
      this.getImageAbsoluteAndRelativePaths(files);
    this.checkFileValidationError(validationError, imageAbsolutePaths);

    const { oldImages, ...data } = body;

    const updatedProduct = await this.Product.findByIdAndUpdate(
      id,
      {
        ...data,
        images: [...imageRelativePaths],
      },
      { new: true },
    );
    if (!updatedProduct) {
      throw new HttpException(
        'failed to update product! something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      this.deleteUploadedImage(imageAbsolutePaths);
    }
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

  checkFileValidationError(
    validationErrors: string[],
    absoluteImagePaths: string[],
  ) {
    if (validationErrors != null && validationErrors.length > 0) {
      throw new HttpException(
        validationErrors[0],
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );
      this.deleteUploadedImage(absoluteImagePaths);
    }
  }
}
