const request = require('supertest');
const app = require('../app');  // Make sure to export your app from app.js

describe('POST /api/users/register', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });
});
