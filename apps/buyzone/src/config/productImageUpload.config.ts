import { UnsupportedMediaTypeException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import * as path from 'path';
import pathModule from './path.config';

const storage = multer.diskStorage({
  destination: path.join(pathModule.uploads, 'buyzone/images/products'),
  filename: (req, file, cb) => {
    const name = `productImage-${Date.now()}.${file.mimetype.split('/')[1]}`;
    cb(null, name);
  },
});

const productImageUploadConfig: MulterOptions = {
  storage,
  fileFilter: (req, file, cb) => {
    req.filevalidationError = [];
    const accesptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (accesptedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else if (!accesptedFileTypes.includes(file.mimetype)) {
      cb(
        new UnsupportedMediaTypeException(
          'Image should be only of type png,jpg or jpeg',
        ),
        null,
      );
    }
  },
  limits: { fileSize: 1000 * 1000 },
};

export default productImageUploadConfig;
