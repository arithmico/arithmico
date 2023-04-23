import { Controller, Post, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('/logout')
export class LogoutController {
  constructor(private configService: ConfigService) {}

  @Post()
  async logout(@Res() response: Response): Promise<void> {
    response.status(200);
    response.clearCookie('refreshToken', {
      domain: this.configService.get('jwt.domain'),
    });
    response.end();
  }
}
