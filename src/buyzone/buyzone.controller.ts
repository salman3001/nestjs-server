import { Controller, Get } from '@nestjs/common';
import { BuyzoneService } from './buyzone.service';

@Controller('buyzone')
export class BuyzoneController {
  constructor(private readonly buyzoneService: BuyzoneService) {}

  @Get()
  getWelcome() {
    return this.buyzoneService.welcome();
  }
}
