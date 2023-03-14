import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { BuyzoneModule } from './buyzone.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(BuyzoneModule);
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'));
  app.setGlobalPrefix('api', { exclude: ['/'] });
  await app.listen(3000);
}
bootstrap();
