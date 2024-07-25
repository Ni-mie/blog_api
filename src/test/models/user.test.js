const { expect } = require('chai');
const User = require('../../models/User');
const sequelize = require('../../config/database');

describe('User Model', () => {
  before(async () => {
    await sequelize.sync({ force: true }); // Ensure a clean database for testing
  });

  it('should create a new user with valid properties', async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });

    expect(user.username).to.equal('testuser');
    expect(user.email).to.equal('testuser@example.com');
    expect(user.password).to.exist;
  });
});

