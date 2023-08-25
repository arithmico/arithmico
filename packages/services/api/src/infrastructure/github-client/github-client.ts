import { FeatureList } from './github-client.types';

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
}
