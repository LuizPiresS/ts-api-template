import axios from 'axios';

import githubITeacherData from '../mocks/github-iteacher-data.json';
import githubITeacherNormalizedData from '../mocks/github-iteacher-normalized-data.json';
import { GithubRepos } from './github-repos';

describe('GithubRepos client', () => {
  // mocka o axios para que não fique batendo toda hora na api do github
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should return normalized github repository data', async () => {
    const githubUserName = 'LuizPiresS';
    const repoName = 'ITeacher';

    mockedAxios.get = jest.fn().mockResolvedValue({ data: githubITeacherData });

    const githubRepos = new GithubRepos(mockedAxios);
    const response = await githubRepos.getRepo(githubUserName, repoName);

    expect(response).toEqual(githubITeacherNormalizedData);
  });

  it('should get a generic error from GitHub service when the request fail before reaching the service', async () => {
    const githubUserName = 'LuizPiresS';
    const repoName = 'ITeacher';

    mockedAxios.get.mockRejectedValue({ message: 'Network Error' });

    const githubRepos = new GithubRepos(mockedAxios);

    await expect(githubRepos.getRepo(repoName, githubUserName)).rejects.toThrow(
      'Unexpected error when trying to communicate to Github: Network Error'
    );
  });
});
