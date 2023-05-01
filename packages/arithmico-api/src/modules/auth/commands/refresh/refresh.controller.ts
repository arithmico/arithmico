import {
  BadRequestException,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandBus } from '@nestjs/cqrs';
import { Request, Response } from 'express';
import { Public } from '../../../../decorators/public.decorator';
import { RefreshCommand } from './refresh.command';
import { RefreshResponseDto } from './refresh.response.dto';

@Controller('/refresh')
export class RefreshController {
  constructor(
    private commandBus: CommandBus,
    private configService: ConfigService,
  ) {}

  @Public()
  @Post()
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const refreshToken = request.cookies['refreshToken'];

    if (typeof refreshToken !== 'string' || !refreshToken) {
      throw new BadRequestException();
    }

    const result = await this.commandBus.execute(
      new RefreshCommand(refreshToken),
    );

    const body: RefreshResponseDto = {
      accessToken: result.accessToken,
    };
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
