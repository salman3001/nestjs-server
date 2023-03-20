import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { userDocument } from '../user/schema/user.schema';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
  ) {}

  async login(email: string, password: string, res: Response) {
    const user = await this.validateUser(email, password);

    if (!user) throw new UnauthorizedException();

    const payload = {
      id: user?._id,
      isAdmin: user.isAdmin,
      name: user.firstName + ' ' + user.lastName,
      email: user.email,
    };

    const accessToken = this.generateAccessToken(payload);

    const refreshToken = this.generateRefreshToken(user._id);

    res.cookie('REFRESH_TOKEN', refreshToken, {
      path: '/api/buyzone/auth/getrefreshtoken',
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
      secure: false,
    });

    res.cookie('ACCESS_TOKEN', accessToken, {
      path: '/',
      maxAge: 1000 * 60 * 15,
      httpOnly: true,
      secure: false,
    });

    return {
      message: 'success',
    };
  }

  logout(res: Response) {
    res.cookie('ACCESS_TOKEN', 'null', {
      path: '/',
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
      secure: false,
    });

    res.cookie('REFRESH_TOKEN', 'null', {
      path: '/api/buyzone/auth/getrefreshtoken',
      httpOnly: true,
      secure: false,
    });

    return {
      message: 'Logout success',
    };
  }

  async getRefreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['REFRESH_TOKEN'];
    try {
      const userDecode = jwt.verify(
        refreshToken,
        this.configService.get('JWT_SECERETE'),
      );

      if (userDecode) {
        const user = await this.usersService.findOne(userDecode['id']);
        const accessToken = this.generateAccessToken({
          id: user?._id,
          isAdmin: user.isAdmin,
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
        });

        res.cookie('ACCESS_TOKEN', accessToken, {
          path: '/',
          maxAge: 1000 * 60 * 15,
          httpOnly: true,
          secure: false,
        });

        return { message: 'Access token reniew success' };
      }
    } catch (err) {
      throw new UnauthorizedException('refresh token not valid! Please login.');
    }
  }

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

  generateRefreshToken(id) {
    return jwt.sign({ id }, this.configService.get('JWT_SECERETE'), {
      expiresIn: '1d',
    });
  }
}
