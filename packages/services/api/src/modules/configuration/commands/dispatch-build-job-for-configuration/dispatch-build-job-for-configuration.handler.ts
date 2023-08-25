import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BuildJobRepository } from '../../../../infrastructure/database/repositories/build-job/build-job.repository';
import { ConfigurationRepository } from '../../../../infrastructure/database/repositories/configuration/configuration.repository';
import { VersionTagRepository } from '../../../../infrastructure/database/repositories/version-tag/version-tag.repository';
import { GithubClient } from '../../../../infrastructure/github-client/github-client';
import { DispatchBuildJobForConfigurationCommand } from './dispatch-build-job-for-configuration.command';
import { DispatchBuildJobForConfigurationResponseDto } from './dispatch-build-job-for-configuration.response.dto';

@CommandHandler(DispatchBuildJobForConfigurationCommand)
export class DispatchBuildJobForConfigurationHandler
  implements ICommandHandler<DispatchBuildJobForConfigurationCommand>
{
  constructor(
    private readonly configurationRepository: ConfigurationRepository,
    private readonly versionTagRepository: VersionTagRepository,
    private readonly buildJobRepository: BuildJobRepository,
    private readonly githubClient: GithubClient,
  ) {}

  async execute(
    command: DispatchBuildJobForConfigurationCommand,
  ): Promise<DispatchBuildJobForConfigurationResponseDto> {
    const configurationDocument =
      await this.configurationRepository.getConfigurationByIdOrThrow(
        command.configurationId,
      );
    const configurationRevisionDocument =
      await this.configurationRepository.getRevisionByConfigurationIdAndRevisionIdOrThrow(
        command.configurationId,
        command.configurationRevisionId,
      );
    const versionTagDocument =
      await this.versionTagRepository.getVersionTagByIdOrThrow(
        command.versionTagId,
      );

    const versionString = `${versionTagDocument.version.major}.${versionTagDocument.version.minor}.${versionTagDocument.version.patch}`;
    const buildJobName = `${configurationDocument.name}-${configurationRevisionDocument.revision}_${versionString}`;
    const artifactPath = `artifacts/${configurationDocument.name}/${buildJobName}`;
    const buildJobDocument = await this.buildJobRepository.createBuildJob(
      buildJobName,
      configurationDocument._id,
      configurationRevisionDocument._id,
      versionTagDocument._id,
    );

    await this.githubClient.dispatchWorkflow('build-offline-version.yml', {
      commitHash: versionTagDocument.commit,
      artifactPath,
      buildJobRef: buildJobDocument._id,
    });

    return {
      id: buildJobDocument._id,
      name: buildJobDocument.name,
      configurationId: buildJobDocument.configurationId,
      configurationRevisionId: buildJobDocument.configurationRevisionId,
      versionTagId: buildJobDocument.versionTagId,
      createdAt: buildJobDocument.createdAt,
    };
  }
}