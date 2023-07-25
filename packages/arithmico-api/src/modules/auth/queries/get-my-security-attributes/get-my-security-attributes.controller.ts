import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { GetMySecurityAttributesQuery } from './get-my-security-attributes.query';
import { GetMySecurityAttributesResponseDto } from './get-my-security-attributes.response.dto';

@Controller('security-attributes')
export class GetMySecurityAttributesController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getMySecurityAttributes(
    @Req() request: Request,
  ): Promise<GetMySecurityAttributesResponseDto> {
    const authHeader = request.header('Authorization');
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    return this.queryBus.execute(new GetMySecurityAttributesQuery(authHeader));
  }
}
