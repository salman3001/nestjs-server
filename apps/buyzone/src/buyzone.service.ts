import { Injectable } from '@nestjs/common';

@Injectable()
export class BuyzoneService {
  getHello(): string {
    return 'Hello World!';
  }
}
