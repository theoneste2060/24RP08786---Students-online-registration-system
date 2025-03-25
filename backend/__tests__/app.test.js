const request = require('supertest');
const app = require('../app');

describe('Backend API Tests', () => {
  test('Health check endpoint should return status ok', async () => {
    const response = await request(app)
      .get('/api/status')
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });
});