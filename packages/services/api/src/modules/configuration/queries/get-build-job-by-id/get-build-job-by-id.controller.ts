import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetBuildJobByIdResponseDto } from './get-build-job-by-id.response.dto';
import { GetBuildJobByIdRequestParamsDto } from './get-build-job-by-id.request.params.dto';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetBuildJobByIdQuery } from './get-build-job-by-id.query';

@Controller(
  ':configurationId/revisions/configurationRevisionId/build-jobs/:buildJobId',
)
export class GetBuildJobByIdController {
  constructor(private queryBus: QueryBus) {}

  @SecurityAttributes(SecurityAttribute.BuildJobRead)
  @Get()
  async getBuildJobById(
    @Param() params: GetBuildJobByIdRequestParamsDto,
  ): Promise<GetBuildJobByIdResponseDto> {
    return this.queryBus.execute(
      new GetBuildJobByIdQuery(
        params.configurationId,
        params.configurationRevisionId,
        params.buildJobId,
      ),
    );
  }
}
