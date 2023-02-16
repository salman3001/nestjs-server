import { Injectable } from '@nestjs/common';

@Injectable()
export class BuyzoneService {
  welcome(): string {
    return 'welcome to buyzone server';
  }
}
