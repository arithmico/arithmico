import { Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Public } from '../../../../decorators/public.decorator';

@Controller('/logout')
export class LogoutController {
  constructor(private configService: ConfigService) {}

  @Public()
  @HttpCode(200)
  @Post()
  async logout(@Res() response: Response): Promise<void> {
    response.status(200);
    response.end();
  }
}
