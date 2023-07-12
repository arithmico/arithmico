import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetVersionTagByIdResponseDto } from './get-version-tag-by-id.response.dto';
import { GetVersionTagByIdRequestParamsDto } from './get-version-tag-by-id.request.params.dto';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetVersionTagByIdQuery } from './get-version-tag-by-id.query';

@Controller(':tagId')
export class GetVersionTagByIdController {
  constructor(private queryBus: QueryBus) {}

  @SecurityAttributes(SecurityAttribute.VersionTagsRead)
  @Get()
  async getVersionTagById(
    @Param() params: GetVersionTagByIdRequestParamsDto,
  ): Promise<GetVersionTagByIdResponseDto> {
    return this.queryBus.execute(new GetVersionTagByIdQuery(params.tagId));
  }
}
