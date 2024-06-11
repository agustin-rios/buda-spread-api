import request from 'supertest';
import app from '../src/index';  // Ensure this path is correct to import your Express app

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

describe('Market Routes', () => {
    it('should get a list of markets', async () => {
      const response = await request(app).get('/api/buda/markets');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  
    it('should get a specific market by ID', async () => {
      const marketId = 'BTC-CLP';  
      const response = await request(app).get(`/api/buda/markets/${marketId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', marketId);
    });
  
    it('should get order book for a specific market', async () => {
      const marketId = 'BTC-CLP';  
      const response = await request(app).get(`/api/buda/markets/${marketId}/order_book`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('bids');
      expect(response.body).toHaveProperty('asks');
    });
  
    it('should calculate spread for a specific market', async () => {
      const marketId = 'BTC-CLP';  
      const response = await request(app).get(`/api/buda/markets/${marketId}/spread`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('spread');
    });
  
    it('should get spreads for all markets', async () => {
      const response = await request(app).get('/api/buda/markets/spreads');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });