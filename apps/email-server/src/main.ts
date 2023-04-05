import { NestFactory } from '@nestjs/core';
import { EmailServerModule } from './email-server.module';

async function bootstrap() {
  const app = await NestFactory.create(EmailServerModule);
  await app.listen(3000);
}
bootstrap();
