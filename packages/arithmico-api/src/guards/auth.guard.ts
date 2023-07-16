import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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

    const accessTokenClaims =
      await this.authService.verifyAccessTokenAndGetClaims(authHeader);
    if (!accessTokenClaims) {
      throw new UnauthorizedException();
    }

    const securityAttributes = await this.authService.getSecurityAttributes(
      accessTokenClaims.userId,
    );
    const endpointSecurityAttributes: Set<string> | null = this.reflector.get(
      'securityAttributes',
      context.getHandler(),
    );

    if (endpointSecurityAttributes) {
      if (
        ![...endpointSecurityAttributes.values()].every(
          (endpointSecurityAttribute) =>
            securityAttributes.has(endpointSecurityAttribute),
        )
      ) {
        throw new ForbiddenException();
      }
    }

    return true;
  }
}
