const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME,
   process.env.DB_USER, process.env.DB_PASSWORD, {
  host: '127.0.0.1',
  port: 3307,
  dialect: 'mysql',
});

module.exports = sequelize;
