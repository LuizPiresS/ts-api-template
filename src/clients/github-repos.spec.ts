import axios from 'axios';

import githubITeacherData from '../mocks/github-iteacher-data.json';
import githubITeacherNormalizedData from '../mocks/github-iteacher-normalized-data.json';
import { GithubRepos } from './github-repos';

describe('GithubRepos client', () => {
  // mocka o axios para que não fique batendo toda hora na api do github
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  test('should return normalized github repository data', async () => {
    const githubUserName = 'LuizPiresS';
    const repoName = 'ITeacher';

    mockedAxios.get = jest.fn().mockResolvedValue({ data: githubITeacherData });

    const githubRepos = new GithubRepos(mockedAxios);
    const response = await githubRepos.getRepo(githubUserName, repoName);

    expect(response).toEqual(githubITeacherNormalizedData);
  });
});
