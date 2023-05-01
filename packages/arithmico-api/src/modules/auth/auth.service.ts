import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';

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
  ) {}

  async checkAccessToken(accessToken: string): Promise<boolean> {
    const accessTokenClaims = await this.jwtService
      .verifyAsync(accessToken)
      .catch(() => {
        throw new ForbiddenException();
      });

    if (
      typeof accessTokenClaims !== 'object' ||
      typeof accessTokenClaims.userId !== 'string'
    ) {
      return false;
    }

    const cachedUser = await this.cacheManager.get<UserCacheEntry>(
      `users/${accessTokenClaims.userId}`,
    );

    if (cachedUser) {
      if (cachedUser.passwordHash) {
        return true;
      }
      return false;
    }

    const userDocument = await this.userRepository.getUserById(
      accessTokenClaims.userId,
    );

    if (!userDocument || !userDocument.passwordHash) {
      return false;
    }

    this.cacheManager.set(`users/${userDocument._id}`, {
      userId: userDocument._id,
      passwordHash: userDocument.passwordHash,
    } as UserCacheEntry);

    return true;
  }
}
