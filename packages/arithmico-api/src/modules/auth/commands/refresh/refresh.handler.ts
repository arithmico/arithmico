import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../../../infrastructure/database/repositories/user/user.repository';
import { AccessTokenClaims, RefreshTokenClaims } from '../../types';
import { RefreshCommand } from './refresh.command';

interface Result {
  accessToken: string;
  refreshToken: string;
}

@CommandHandler(RefreshCommand)
export class RefreshCommandHandler implements ICommandHandler<RefreshCommand> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute(command: RefreshCommand): Promise<Result> {
    const claims = await this.jwtService.verifyAsync(command.refreshToken);

    if (typeof claims !== 'object' || typeof claims.userId !== 'string') {
      throw new BadRequestException();
    }

    const userDocument = await this.userRepository.getUserById(claims.userId);

    if (!userDocument) {
      throw new BadRequestException();
    }

    if (!userDocument.passwordHash) {
      throw new BadRequestException();
    }

    const accessTokenClaims: AccessTokenClaims = {
      type: 'accessToken',
      userId: userDocument._id,
    };

    const refreshTokenClaims: RefreshTokenClaims = {
      type: 'refreshToken',
      userId: userDocument._id,
    };

    return {
      accessToken: this.jwtService.sign(accessTokenClaims, {
        expiresIn: this.configService.get<number>('jwt.accessTokenLifetime'),
      }),
      refreshToken: this.jwtService.sign(refreshTokenClaims, {
        expiresIn: this.configService.get<number>('jwt.refreshTokenLifetime'),
      }),
    };
  }
}
