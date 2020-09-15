import supertest from 'supertest';

import { SetupServer } from '../server';

beforeAll(() => {
  const server = new SetupServer();
  server.init();
  global.testRequest = supertest(server.getApp());
});
