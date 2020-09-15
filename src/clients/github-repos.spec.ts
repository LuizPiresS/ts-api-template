import axios from 'axios';

import githubITeacherData from '../mocks/github-iteacher-data.json';
import githubITeacherNormalizedData from '../mocks/github-iteacher-normalized-data.json';
import { GithubRepos } from './github-repos';

jest.mock('axios');

describe('GithubRepos client', () => {
  test('should return normalized github repository data', async () => {
    const githubUserName = 'LuizPiresS';
    const repoName = 'ITeacher';

    // mocka o axios para que não fique batendo toda hora na api do github
    axios.get = jest.fn().mockResolvedValue({ data: githubITeacherData });

    const githubRepos = new GithubRepos(axios);
    const response = await githubRepos.getRepo(githubUserName, repoName);

    expect(response).toEqual(githubITeacherNormalizedData);
  });
});
