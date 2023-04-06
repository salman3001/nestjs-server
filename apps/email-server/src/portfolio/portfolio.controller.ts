import {
  Body,
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { MessageBodyDTO } from './dto/messageBody.dto';
import { PortfolioService } from './portfolio.service';

@Controller()
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  send(@Headers('host') host: string, @Body() messagebody: MessageBodyDTO) {
    if (
      host === 'localhost:4000' ||
      host === 'salman3001.github.io' ||
      host === 'localhost:5173'
    ) {
      const { username, email, message } = messagebody;
      return this.portfolioService.send(username, email, message);
    } else {
      throw new UnauthorizedException();
    }
    return {};
  }
}
