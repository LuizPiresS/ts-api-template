import { AxiosStatic } from 'axios';

import { InternalError } from '../common/errors/internal-error';

export interface DataGithubResponse {
  [key: string]: string | number | boolean;
}

export interface OwnerGithubRepo {
  login: DataGithubResponse;
  id: DataGithubResponse;
  node_id: DataGithubResponse;
  avatar_url: DataGithubResponse;
  gravatar_id: DataGithubResponse;
  url: DataGithubResponse;
  html_url: DataGithubResponse;
  followers_url: DataGithubResponse;
  following_url: DataGithubResponse;
  gists_url: DataGithubResponse;
  starred_url: DataGithubResponse;
  subscriptions_url: DataGithubResponse;
  organizations_url: DataGithubResponse;
  repos_url: DataGithubResponse;
  events_url: DataGithubResponse;
  received_events_url: DataGithubResponse;
  type: DataGithubResponse;
  site_admin: DataGithubResponse;
}

export interface LicenseGithubRepo {
  key: DataGithubResponse;
  name: DataGithubResponse;
  spdx_id: DataGithubResponse;
  url: DataGithubResponse;
  node_id: DataGithubResponse;
}
export interface GithubReposResponse {
  id: DataGithubResponse;
  node_id: DataGithubResponse;
  name: DataGithubResponse;
  private: DataGithubResponse;
  owner: OwnerGithubRepo;
  html_url: DataGithubResponse;
  description: DataGithubResponse;
  fork: DataGithubResponse;
  url: DataGithubResponse;
  forks_url: DataGithubResponse;
  keys_url: DataGithubResponse;
  collaborators_url: DataGithubResponse;
  teams_url: DataGithubResponse;
  hooks_url: DataGithubResponse;
  issue_events_url: DataGithubResponse;
  events_url: DataGithubResponse;
  assignees_url: DataGithubResponse;
  branches_url: DataGithubResponse;
  tags_url: DataGithubResponse;
  blobs_url: DataGithubResponse;
  git_tags_url: DataGithubResponse;
  git_refs_url: DataGithubResponse;
  trees_url: DataGithubResponse;
  statuses_url: DataGithubResponse;
  languages_url: DataGithubResponse;
  stargazers_url: DataGithubResponse;
  contributors_url: DataGithubResponse;
  subscribers_url: DataGithubResponse;
  subscription_url: DataGithubResponse;
  commits_url: DataGithubResponse;
  git_commits_url: DataGithubResponse;
  comments_url: DataGithubResponse;
  issue_comment_url: DataGithubResponse;
  contents_url: DataGithubResponse;
  compare_url: DataGithubResponse;
  merges_url: DataGithubResponse;
  archive_url: DataGithubResponse;
  downloads_url: DataGithubResponse;
  issues_url: DataGithubResponse;
  pulls_url: DataGithubResponse;
  milestones_url: DataGithubResponse;
  notifications_url: DataGithubResponse;
  labels_url: DataGithubResponse;
  releases_url: DataGithubResponse;
  deployments_url: DataGithubResponse;
  created_at: DataGithubResponse;
  updated_at: DataGithubResponse;
  pushed_at: DataGithubResponse;
  git_url: DataGithubResponse;
  ssh_url: DataGithubResponse;
  clone_url: DataGithubResponse;
  svn_url: DataGithubResponse;
  homepage: DataGithubResponse;
  size: DataGithubResponse;
  stargazers_count: DataGithubResponse;
  watchers_count: DataGithubResponse;
  language: DataGithubResponse;
  has_issues: DataGithubResponse;
  has_projects: DataGithubResponse;
  has_downloads: DataGithubResponse;
  has_wiki: DataGithubResponse;
  has_pages: DataGithubResponse;
  forks_count: DataGithubResponse;
  mirror_url: null;
  archived: DataGithubResponse;
  disabled: DataGithubResponse;
  open_issues_count: DataGithubResponse;
  license: LicenseGithubRepo;
  forks: DataGithubResponse;
  open_issues: DataGithubResponse;
  watchers: DataGithubResponse;
  default_branch: DataGithubResponse;
  temp_clone_token: DataGithubResponse;
  network_count: DataGithubResponse;
  subscribers_count: DataGithubResponse;
}

export interface PortfolioRepo {
  name: DataGithubResponse;
  html_url: DataGithubResponse;
  description: DataGithubResponse;
  created_at: DataGithubResponse;
  updated_at: DataGithubResponse;
  pushed_at: DataGithubResponse;
  license: {
    name: DataGithubResponse;
    url: DataGithubResponse;
  };
  language: DataGithubResponse;
}

export class ClientRequestError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      'Unexpected error when trying to communicate to Github';

    super(`${internalMessage}: ${message}`);
  }
}
export class GithubRepos {
  // É necessário que se passe um axios como parâmetro
  constructor(protected request: AxiosStatic) {}

  public async getRepo(
    githubUserName: string,
    repoName: string
  ): Promise<PortfolioRepo> {
    try {
      const response = await this.request.get<GithubReposResponse>(
        `http://api.github.com/repos/${githubUserName}/${repoName}`
      );

      return this.normalizedResponse(response.data);
    } catch (err) {
      throw new ClientRequestError(err.message);
    }
  }

  private normalizedResponse(repo: GithubReposResponse): PortfolioRepo {
    return {
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      license: {
        name: repo.license.name,
        url: repo.license.url,
      },
      language: repo.language,
    };
  }
}
