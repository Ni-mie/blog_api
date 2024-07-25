const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');
const User = require('../../models/User');
const sequelize = require('../../config/database');

before(async () => {
  await sequelize.sync({ force: true }); // Ensure a clean database for testing
});

describe('User Authentication', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });gi

    expect(res.status).to.equal(201);
    expect(res.body.user).to.have.property('username', 'testuser');
    expect(res.body.user).to.have.property('email', 'testuser@example.com');
    expect(res.body).to.have.property('token');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(res.status).to.equal(200);
    expect(res.body.user).to.have.property('email', 'testuser@example.com');
    expect(res.body).to.have.property('token');
  });

  it('should fail to login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword'
      });

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error', 'Invalid credentials');
  });
});
