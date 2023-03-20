import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { logindto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('login')
  async login(
    @Body() body: logindto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;
    const resObject = await this.authservice.login(email, password, res);
    return { ...resObject };
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authservice.logout(res);
  }

  @Get('getrefreshtoken')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authservice.getRefreshToken(req, res);
  }
}
