import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class Authguard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();

    const token = req.headers?.authorization?.split(' ')[1];
    try {
      const user = jwt.verify(token, this.configService.get('JWT_SECERETE'));

      if (!user) throw new UnauthorizedException();
      req['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
