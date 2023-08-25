import { Logger } from '@nestjs/common';
import { semanticVersionGreaterThanOrEqual } from '../../common/utils/compare-versions/compare-versions';
import { firstConfigurableVersion } from '../../modules/version-tag/processors/sync-git-tags/sync-git-tags.processor';
import { SemanticVersion } from '../database/schemas/sematic-version/semantic-version.schema';
import { VersionTag } from '../database/schemas/version-tag/version-tag.schema';
import { FeatureList, GitRefDto } from './github-client.types';

export class GithubClient {
  private readonly logger = new Logger(GithubClient.name);

  constructor(private readonly githubToken?: string) {}

  private getHeaders(): Headers {
    const headers = new Headers();
    if (this.githubToken) {
      headers.append('Authorization', `Bearer ${this.githubToken}`);
    }
    headers.append('X-GitHub-Api-Version', '2022-11-28');
    headers.append('Accept', 'application/vnd.github+json');
    return headers;
  }

  async getEngineFeatureList(): Promise<FeatureList> {
    const headers = this.getHeaders();
    return (await fetch(
      'https://raw.githubusercontent.com/arithmico/arithmico/main/packages/libraries/engine/features.json',
      {
        method: 'GET',
        mode: 'cors',
        headers,
      },
    )
      .catch(() => {
        throw 'failed to fetch engine feature list from raw.githubusercontent.com';
      })
      .then((response) => response.json())
      .catch(() => {
        throw 'failed to parse engine feature list';
      })) as FeatureList;
  }

  async getVersionTags(): Promise<VersionTag[]> {
    const headers = this.getHeaders();
    return (
      (await fetch(
        'https://api.github.com/repos/arithmico/arithmico/git/refs/tags',
        {
          method: 'GET',
          mode: 'cors',
          headers,
        },
      )
        .catch(() => {
          throw 'failed to fetch version tags from github';
        })
        .then((response) => response.json())
        .catch(() => {
          throw 'failed to parse version tags from github';
        })) as GitRefDto[]
    )
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
      });
  }

  async dispatchWorkflow(
    workflowId: string,
    inputs: Record<string, string>,
  ): Promise<void> {
    const headers = this.getHeaders();
    this.logger.log({
      workflowId,
      inputs,
    });
    await fetch(
      `https://api.github.com/repos/arithmico/arithmico/actions/workflows/${workflowId}/dispatches`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ref: 'main',
          inputs,
        }),
      },
    )
      .then((response) => this.logger.log({ status: response.status }))
      .catch((err) => this.logger.error({ err }));
  }
}
