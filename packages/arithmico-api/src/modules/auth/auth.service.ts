import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { SecurityAttributesRepository } from '../../infrastructure/database/repositories/security-attributes.repository';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import { AccessTokenClaims } from './types';

interface UserCacheEntry {
  userId: string;
  passwordHash: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private securityAttributesRepository: SecurityAttributesRepository,
  ) {}

  async verifyAccessTokenAndGetClaims(
    accessToken: string,
  ): Promise<AccessTokenClaims | null> {
    return this.jwtService
      .verifyAsync(accessToken)
      .then(async (accessTokenClaims) => {
        if (
          typeof accessTokenClaims !== 'object' ||
          typeof accessTokenClaims.userId !== 'string'
        ) {
          return null;
        }

        const cachedUser = await this.cacheManager.get<UserCacheEntry>(
          `users/${accessTokenClaims.userId}`,
        );

        if (cachedUser) {
          if (cachedUser.passwordHash) {
            return accessTokenClaims;
          }
          return null;
        }

        const userDocument = await this.userRepository.getUserById(
          accessTokenClaims.userId,
        );

        if (!userDocument || !userDocument.passwordHash) {
          return null;
        }

        this.cacheManager.set(`users/${userDocument._id}`, {
          userId: userDocument._id,
          passwordHash: userDocument.passwordHash,
        } as UserCacheEntry);

        return accessTokenClaims;
      })
      .catch(() => false);
  }

  async getSecurityAttributes(userId: string): Promise<Set<string>> {
    return this.securityAttributesRepository.aggregateUserSecurityAttributes(
      userId,
    );
  }
}
