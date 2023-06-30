import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
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
  @HttpCode(200)
  @Post()
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const result = await this.commandBus.execute(
      new LoginCommand(loginRequestDto.username, loginRequestDto.password),
    );

    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    };
  }
}
