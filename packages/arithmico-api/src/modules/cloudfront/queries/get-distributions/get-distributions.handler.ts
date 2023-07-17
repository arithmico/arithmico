import {
  CloudFrontClient,
  ListDistributionsCommand,
  ListTagsForResourceCommand,
} from '@aws-sdk/client-cloudfront';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetDistributionsQuery } from './get-distributions.query';

@QueryHandler(GetDistributionsQuery)
export class GetDistributionsHandler
  implements IQueryHandler<GetDistributionsQuery>
{
  private readonly client: CloudFrontClient;
  private readonly logger = new Logger(GetDistributionsHandler.name);

  constructor(private configService: ConfigService) {
    const accessKeyId = configService.get('aws.access_key_id') as
      | string
      | undefined;
    const secretAccessKey = configService.get('aws.secret_access_key') as
      | string
      | undefined;

    const credentials = accessKeyId &&
      secretAccessKey && {
        accessKeyId,
        secretAccessKey,
      };

    this.client = new CloudFrontClient({
      region: 'eu-central-1',
      credentials,
    });
  }

  async execute(): Promise<void> {
    const command = new ListDistributionsCommand({});
    const result = await this.client.send(command);
    (
      await Promise.all(
        result.DistributionList?.Items.map(async (distribution) => {
          const tagsList = await this.client.send(
            new ListTagsForResourceCommand({ Resource: distribution.ARN }),
          );
          const pairs = tagsList.Tags.Items.map(
            ({ Key, Value }) => [Key, Value] as [string, string],
          );
          const tags = new Map<string, string>(pairs);
          return {
            id: distribution.Id,
            arn: distribution.ARN,
            origins: distribution.Origins.Items,
            aliases: distribution.Aliases.Items,
            application: tags.get('Application'),
            environment: tags.get('Environment'),
          };
        }),
      )
    )
      .filter(
        (distribution) => distribution.application && distribution.environment,
      )
      .forEach((distribution) => this.logger.log(distribution));
  }
}
