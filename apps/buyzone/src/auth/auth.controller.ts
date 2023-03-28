import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Authguard } from '../guards/Auth.guard';
import { isAdminGuard } from '../guards/isAdmin.guard';
import { AuthService } from './auth.service';
import { logindto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('login')
  async login(@Body() body: logindto) {
    console.log('hi');
    const { email, password } = body;
    const resObject = await this.authservice.login(email, password);
    return { ...resObject };
  }

  // @Get('logout')
  // logout(@Res({ passthrough: true }) res: Response) {
  //   return this.authservice.logout(res);
  // }

  // @Get('getrefreshtoken')
  // async refreshToken(
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   return await this.authservice.getRefreshToken(req, res);
  // }

  @Get('isloggedin')
  @UseGuards(Authguard)
  isLogedin() {
    return {
      message: true,
    };
  }

  @Get('isadmin')
  @UseGuards(Authguard, isAdminGuard)
  isAdmin() {
    return {
      message: true,
    };
  }
}
