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

interface FeatureList {
  types: string[];
  constants: string[];
  functions: string[];
  methods: string[];
  operators: string[];
}

interface GitRefDto {
  ref: string;
  node_id: string;
  url: string;
  object: {
    sha: string;
    type: string;
    url: string;
  };
}

const firstConfigurableVersion: SemanticVersion = {
  major: 2,
  minor: 3,
  patch: 3,
};

@Processor('cron-jobs')
export class SyncGitTagsProcessor {
  private readonly logger = new Logger(SyncGitTagsProcessor.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private versionTagRepository: VersionTagRepository,
    private featureFlagRepository: FeatureFlagRepository,
  ) {}

  @Process('sync-git-tags')
  async syncGitTags() {
    const versionTags = await this.getTagsFromGithub();
    await this.createMissingVersionTags(versionTags);
    const latestVersionTag =
      await this.versionTagRepository.getLatestVersionTagOrThrow();
    const featureList = await this.getFeatureListFromGithub();

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
    return flags.map(async (constant) => {
      const featureFlag =
        await this.featureFlagRepository.getFeatureFlagByFlagAndType(
          constant,
          type,
        );
      if (featureFlag) {
        return;
      }
      this.logger.log(`creating feature flag "${constant}" (${type})`);
      await this.featureFlagRepository.createFeatureFlag(
        type,
        constant,
        constant,
        versionTagId,
      );
    });
  }

  async getFeatureListFromGithub(): Promise<FeatureList> {
    return (
      await this.httpService.axiosRef.get<any>(
        'https://raw.githubusercontent.com/arithmico/arithmico/main/packages/arithmico-engine/features.json',
      )
    ).data;
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

  async getTagsFromGithub(): Promise<VersionTag[]> {
    this.logger.log('start git tag sync');
    const personalAccessToken = this.configService.get<string>(
      'github.personalAccessToken',
    );

    const headers = personalAccessToken && {
      Authorization: `token ${personalAccessToken}`,
    };

    const tags = (
      await this.httpService.axiosRef.get<GitRefDto[]>(
        `${this.configService.get<string>(
          'github.repositoryUrl',
        )}/git/refs/tags`,
        {
          headers,
        },
      )
    ).data;

    return tags
      .filter(({ ref, object: { type } }) => {
        if (!ref.startsWith('refs/tags/v')) {
          return false;
        }
        const tag = ref.substring('refs/tags/v'.length);
        if (!tag.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)$/)) {
          return false;
        }
        if (type !== 'commit' && type !== 'tag') {
          return false;
        }
        return true;
      })
      .map(({ ref, object: { sha } }): VersionTag => {
        const versionString = ref.substring('refs/tags/v'.length);
        const [major, minor, patch] = versionString
          .split('.')
          .map((v) => parseInt(v));
        const version: SemanticVersion = { major, minor, patch };
        return {
          commit: sha,
          version,
          configurable: semanticVersionGreaterThanOrEqual(
            version,
            firstConfigurableVersion,
          ),
        };
      })
      .filter(({ version }) =>
        semanticVersionGreaterThanOrEqual(version, firstConfigurableVersion),
      );
  }
}
