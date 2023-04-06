import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { EmailServerController } from './email-server.controller';
import { EmailServerService } from './email-server.service';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
    PortfolioModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    RouterModule.register([
      { path: '/api/portfolio/email', module: PortfolioModule },
    ]),
  ],
  controllers: [EmailServerController],
  providers: [EmailServerService],
})
export class EmailServerModule {}
