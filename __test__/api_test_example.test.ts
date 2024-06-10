import supertest from 'supertest';

const request = supertest('https://jsonplaceholder.typicode.com');

describe('API tests', () => {
  it('should fetch posts', async () => {
    const response = await request.get('/posts');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
