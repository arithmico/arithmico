import { semanticVersionGreaterThanOrEqual } from '../../common/utils/compare-versions/compare-versions';
import { firstConfigurableVersion } from '../../modules/version-tag/processors/sync-git-tags/sync-git-tags.processor';
import { SemanticVersion } from '../database/schemas/sematic-version/semantic-version.schema';
import { VersionTag } from '../database/schemas/version-tag/version-tag.schema';
import { FeatureList, GitRefDto } from './github-client.types';

export class GithubClient {
  constructor(private readonly githubToken?: string) {}

  async getEngineFeatureList(): Promise<FeatureList> {
    const headers = new Headers();
    if (this.githubToken) {
      headers.append('Authorization', this.githubToken);
    }
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
    const headers = new Headers();
    if (this.githubToken) {
      headers.append('Authorization', this.githubToken);
    }
    return (
      (await fetch(
        'https://api.github.com/repos/arithmico/arithmico/git/refs/tags',
        {
          method: 'GET',
          mode: 'cors',
          headers,
        },
      )) as GitRefDto[]
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
}
