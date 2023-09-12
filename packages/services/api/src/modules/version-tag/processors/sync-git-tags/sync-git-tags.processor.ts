import { HttpService } from '@nestjs/axios';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VersionTagRepository } from '../../../../infrastructure/database/repositories/version-tag/version-tag.repository';
import { SemanticVersion } from '../../../../infrastructure/database/schemas/sematic-version/semantic-version.schema';
import { VersionTag } from '../../../../infrastructure/database/schemas/version-tag/version-tag.schema';
import { semanticVersionGreaterThanOrEqual } from '../../../../common/utils/compare-versions/compare-versions';
import { FeatureFlagRepository } from '../../../../infrastructure/database/repositories/feature-flag/feature-flag.repository';
import { FeatureFlagType } from '../../../../infrastructure/database/schemas/feature-flag/feature-flag.schema';
import { GithubClient } from '../../../../infrastructure/github-client/github-client';

export const firstConfigurableVersion: SemanticVersion = {
  major: 2,
  minor: 3,
  patch: 3,
};

@Processor('cron-jobs')
export class SyncGitTagsProcessor {
  private readonly logger = new Logger(SyncGitTagsProcessor.name);
  private readonly githubClient: GithubClient;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private versionTagRepository: VersionTagRepository,
    private featureFlagRepository: FeatureFlagRepository,
  ) {
    this.githubClient = new GithubClient(
      this.configService.get('github.personalAccessToken'),
    );
  }

  @Process('sync-git-tags')
  async syncGitTags() {
    const versionTags = await (
      await this.githubClient.getVersionTags()
    ).filter((tag) =>
      semanticVersionGreaterThanOrEqual(tag.version, firstConfigurableVersion),
    );
    await this.createMissingVersionTags(versionTags);
    const latestVersionTag =
      await this.versionTagRepository.getLatestVersionTagOrThrow();
    const featureList = await this.githubClient.getEngineFeatureList();

    await Promise.all([
      ...this.batchCreateFeatureFlags(
        featureList.constants,
        FeatureFlagType.Constant,
        latestVersionTag._id,
      ),
      ...this.batchCreateFeatureFlags(
        featureList.functions,
        FeatureFlagType.Function,
        latestVersionTag._id,
      ),
      ...this.batchCreateFeatureFlags(
        featureList.methods,
        FeatureFlagType.Method,
        latestVersionTag._id,
      ),
      ...this.batchCreateFeatureFlags(
        featureList.operators,
        FeatureFlagType.Operator,
        latestVersionTag._id,
      ),
      ...this.batchCreateFeatureFlags(
        featureList.types,
        FeatureFlagType.Type,
        latestVersionTag._id,
      ),
    ]);

    this.logger.log('finished git tag sync');
  }

  batchCreateFeatureFlags(
    flags: string[],
    type: FeatureFlagType,
    versionTagId: string,
  ): Promise<void>[] {
    return flags.map(async (flag) => {
      const featureFlag =
        await this.featureFlagRepository.getFeatureFlagByFlagAndType(
          flag,
          type,
        );
      if (featureFlag) {
        return;
      }
      this.logger.log(`creating feature flag "${flag}" (${type})`);
      await this.featureFlagRepository.createFeatureFlag(
        type,
        flag,
        flag,
        versionTagId,
      );
    });
  }

  async createMissingVersionTags(versionTags: VersionTag[]): Promise<void> {
    await Promise.all(
      versionTags.map(async (tag) => {
        if (!(await this.versionTagRepository.versionTagExists(tag.commit))) {
          this.logger.log(`create version tag for commit ${tag.commit}`);
          await this.versionTagRepository.createVersionTag(tag);
        }
      }),
    );
  }
}
