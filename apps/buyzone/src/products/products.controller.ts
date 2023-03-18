import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import productImageUploadConfig from '../config/productImageUpload.config';
import { Authguard } from '../guards/Auth.guard';
import { isAdminGuard } from '../guards/isAdmin.guard';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(Authguard, isAdminGuard)
  @UseInterceptors(FilesInterceptor('images', 5, productImageUploadConfig))
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Body() body: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productsService.create(body, files);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(Authguard, isAdminGuard)
  @UseInterceptors(FilesInterceptor('images', 5, productImageUploadConfig))
  update(
    @Param('id') id: string,
    @Body() body: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productsService.update(id, body, files);
  }

  @Delete(':id')
  @UseGuards(Authguard, isAdminGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
