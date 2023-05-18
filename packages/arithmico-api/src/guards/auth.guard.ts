import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get('public', context.getHandler());
    if (typeof isPublic === 'boolean' && isPublic === true) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    if (!request) {
      throw new UnauthorizedException();
    }

    const authHeader = request.header('Authorization');
    if (typeof authHeader !== 'string' || authHeader.length === 0) {
      throw new UnauthorizedException();
    }

    return this.authService.checkAccessToken(authHeader);
  }
}
