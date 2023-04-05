import { Controller, Get } from '@nestjs/common';
import { EmailServerService } from './email-server.service';

@Controller()
export class EmailServerController {
  constructor(private readonly emailServerService: EmailServerService) {}

  @Get()
  getHello(): string {
    return this.emailServerService.getHello();
  }
}
