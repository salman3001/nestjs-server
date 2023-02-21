import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resObject = await this.authservice.login(email, password, res);
    return { ...resObject };
  }

  @Get('getrefreshtoken')
  async refreshToken(@Req() req: Request) {
    return await this.authservice.getRefreshToken(req);
  }
}
