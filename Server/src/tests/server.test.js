
import { ApolloServer } from '../GraphQL/index';

import request from 'supertest';

const queryData = {
  query: `query sayHello($name: String) {
    hello(name: $name)
  }`,
  variables: { name: 'world' },
};

describe('e2e demo', () => {
  let server, url;


  beforeAll(async () => {

    ({ server, url } = await ApolloServer({ port: 0 }));
  });


  afterAll(async () => {
    await server?.close();
  });

  it('says hello', async () => {

    const response = await request(url).post('/').send(queryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.hello).toBe('Hello world!');
  });
});
