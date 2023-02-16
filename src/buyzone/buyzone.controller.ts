import { Controller } from '@nestjs/common';
import { BuyzoneService } from './buyzone.service';

@Controller('buyzone')
export class BuyzoneController {
  constructor(private readonly buyzoneService: BuyzoneService) {}
}
