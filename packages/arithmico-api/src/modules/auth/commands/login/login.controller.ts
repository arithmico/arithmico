import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { Public } from '../../../../decorators/public.decorator';
import { LoginCommand } from './login.command';
import { LoginRequestDto } from './login.request.dto';
import { LoginResponseDto } from './login.response.dto';

@Controller('/login')
export class LoginController {
  constructor(
    private commandBus: CommandBus,
    private configService: ConfigService,
  ) {}

  @Public()
  @Post()
  async login(
    @Body() loginRequestDto: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const result = await this.commandBus.execute(
      new LoginCommand(loginRequestDto.username, loginRequestDto.password),
    );

    const body: LoginResponseDto = {
      accessToken: result.accessToken,
    };
    Logger.log(this.configService.get('jwt.domain'));
    response.status(200);
    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: this.configService.get<number>('jwt.refreshTokenLifetime'),
      domain: this.configService.get('jwt.domain'),
    });
    response.json(body);
    response.end();
  }
}
