import { UnauthorizedException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { AuthService } from '../../auth.service';
import { GetMySecurityAttributesQuery } from './get-my-security-attributes.query';
import { GetMySecurityAttributesResponseDto } from './get-my-security-attributes.response.dto';

@QueryHandler(GetMySecurityAttributesQuery)
export class GetMySecurityAttributesHandler
  implements IQueryHandler<GetMySecurityAttributesQuery>
{
  constructor(private readonly authService: AuthService) {}

  async execute(
    query: GetMySecurityAttributesQuery,
  ): Promise<GetMySecurityAttributesResponseDto> {
    const accessTokenClaims =
      await this.authService.verifyAccessTokenAndGetClaims(query.accessToken);
    if (!accessTokenClaims) {
      throw new UnauthorizedException();
    }
    const securityAttributes = await this.authService.getSecurityAttributes(
      accessTokenClaims.userId,
    );
    return {
      securityAttributes: [...securityAttributes.values()],
    };
  }
}
