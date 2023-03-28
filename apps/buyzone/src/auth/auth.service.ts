import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { userDocument } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (!user) throw new UnauthorizedException();

    const payload = {
      id: user?._id,
      isAdmin: user.isAdmin,
      name: user.firstName + ' ' + user.lastName,
      email: user.email,
    };

    const accessToken = this.generateAccessToken(payload);

    // const refreshToken = this.generateRefreshToken(payload);

    return {
      message: 'success',
      token: accessToken,
    };
  }

  // logout(res: Response) {
  //   res.clearCookie('ACCESS_TOKEN');
  //   res.clearCookie('IS_LOGGED_IN');
  //   res.clearCookie('REFRESH_TOKEN');

  //   return {
  //     message: 'Logout success',
  //   };
  // }

  // async getRefreshToken(req: Request, res: Response) {
  //   const refreshToken = req.cookies['REFRESH_TOKEN'];

  //   try {
  //     const userDecode = jwt.verify(
  //       refreshToken,
  //       this.configService.get('JWT_SECERETE'),
  //     ) as any;

  //     if (userDecode) {
  //       const user = await this.usersService.findOne(userDecode.id);
  //       const payload = {
  //         id: user?._id,
  //         isAdmin: user.isAdmin,
  //         name: user.firstName + ' ' + user.lastName,
  //         email: user.email,
  //       };
  //       const accessToken = this.generateAccessToken(payload);

  //       // res.cookie('ACCESS_TOKEN', accessToken, {
  //       //   path: '/',
  //       //   maxAge: 1000 * 60 * 15,
  //       //   httpOnly: true,
  //       //   secure: false,
  //       // });

  //       // res.cookie('IS_LOGGED_IN', true, {
  //       //   path: '/',
  //       //   maxAge: 1000 * 60 * 15,
  //       //   httpOnly: false,
  //       //   secure: false,
  //       // });

  //       return { message: 'success', user: userDecode };
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     throw new UnauthorizedException('refresh token not valid! Please login.');
  //   }
  // }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<userDocument | null> {
    const user = await this.usersService.findByEmail(email);
    const isValid = await compare(pass, user.password);
    if (user && isValid) {
      return user;
    }
    return null;
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, this.configService.get('JWT_SECERETE'), {
      expiresIn: '15m',
    });
  }

  // generateRefreshToken(payload: any) {
  //   return jwt.sign(payload, this.configService.get('JWT_SECERETE'), {
  //     expiresIn: '1d',
  //   });
  // }
}
