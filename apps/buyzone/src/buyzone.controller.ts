import { Controller, Get } from '@nestjs/common';
import { BuyzoneService } from './buyzone.service';

@Controller()
export class BuyzoneController {
  constructor(private readonly buyzoneService: BuyzoneService) {}

  @Get()
  getHello(): string {
    return this.buyzoneService.getHello();
  }
}
