import { HttpService } from '@nestjs/axios';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { VersionTagRepository } from '../../../../infrastructure/database/repositories/version-tag/version-tag.repository';
import { VersionTag } from '../../../../infrastructure/database/schemas/version-tag/version-tag.schema';

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

@Processor('cron-jobs')
export class SyncGitTagsProcessor {
  private readonly logger = new Logger(SyncGitTagsProcessor.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private versionTagRepository: VersionTagRepository,
  ) {}

  @Process('sync-git-tags')
  async syncGitTags() {
    this.logger.log('start git tag sync');

    const tags = (
      await lastValueFrom(
        this.httpService.get<GitRefDto[]>(
          `${this.configService.get<string>(
            'github.repositoryUrl',
          )}/git/refs/tags`,
        ),
      )
    ).data;

    tags
      .filter(({ ref, object: { type } }) => {
        if (!ref.startsWith('refs/tags/v')) {
          return false;
        }
        const tag = ref.substring('refs/tags/v'.length);
        if (!tag.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)$/)) {
          return false;
        }
        if (type !== 'commit') {
          return false;
        }
        return true;
      })
      .map(({ ref, object: { sha } }): VersionTag => {
        const version = ref.substring('refs/tags/v'.length);
        const [major, minor, patch] = version.split('.');
        return {
          commit: sha,
          version: {
            major: parseInt(major),
            minor: parseInt(minor),
            patch: parseInt(patch),
          },
        };
      })
      .forEach(async (tag) => {
        if (!(await this.versionTagRepository.versionTagExists(tag.commit))) {
          this.logger.log(`create version tag for commit ${tag.commit}`);
          await this.versionTagRepository.createVersionTag(tag);
        }
      });

    this.logger.log('finished git tag sync');
  }
}
