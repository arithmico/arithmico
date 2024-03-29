import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../../../infrastructure/database/repositories/user/user.repository';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenClaims, RefreshTokenClaims } from '../../types';
import { ConfigService } from '@nestjs/config';

interface Result {
  accessToken: string;
  refreshToken: string;
}

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute(command: LoginCommand): Promise<Result> {
    const userDocument = await this.userRepository.getUserByUsername(
      command.username,
    );

    if (!userDocument) {
      throw new UnauthorizedException();
    }

    if (!userDocument.passwordHash) {
      throw new BadRequestException('please activate your account first');
    }

    if (!(await bcrypt.compare(command.password, userDocument.passwordHash))) {
      throw new UnauthorizedException();
    }

    const accessTokenClaims: AccessTokenClaims = {
      type: 'accessToken',
      userId: userDocument._id,
    };

    const refreshTokenClaims: RefreshTokenClaims = {
      type: 'refreshToken',
      userId: userDocument._id,
    };

    const accessToken = this.jwtService.sign(accessTokenClaims, {
      expiresIn: this.configService.get<number>('jwt.accessTokenLifetime'),
    });

    const refreshToken = this.jwtService.sign(refreshTokenClaims, {
      expiresIn: this.configService.get<number>('jwt.refreshTokenLifetime'),
    });

    return { accessToken, refreshToken };
  }
}
