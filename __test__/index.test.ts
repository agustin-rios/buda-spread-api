import request from 'supertest';
import app from '../src/index';


describe('App /', () => {
  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to Buda Spread API');
  });

  it('should return 404 for a nonexistent route', async () => {
    const response = await request(app).get('/nonexistent-route');
    // Intentionally incorrect expected status to make the test fail
    expect(response.status).toBe(404); // This should actually be 404
  });
});