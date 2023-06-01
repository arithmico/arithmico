import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { Public } from '../../../../decorators/public.decorator';
import { RefreshCommand } from './refresh.command';
import { RefreshRequestDto } from './refresh.request.dto';
import { RefreshResponseDto } from './refresh.response.dto';

@Controller('/refresh')
export class RefreshController {
  constructor(
    private commandBus: CommandBus,
    private configService: ConfigService,
  ) {}

  @Public()
  @Post()
  async refresh(@Body() body: RefreshRequestDto): Promise<RefreshResponseDto> {
    const refreshToken = body.refreshToken;

    if (typeof refreshToken !== 'string' || !refreshToken) {
      throw new BadRequestException();
    }

    const result = await this.commandBus.execute(
      new RefreshCommand(refreshToken),
    );

    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    };
  }
}
