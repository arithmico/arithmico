import { registerAs } from '@nestjs/config';

export default registerAs('github', () => ({
  repositoryUrl: process.env.GITHUB_REPO_URL,
  personalAccessToken: process.env.GITHUB_PAT,
}));
