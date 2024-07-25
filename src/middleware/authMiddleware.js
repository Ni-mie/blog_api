const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    
    console.log('Authorization Header:', token);

    if (!token) {
      return res.status(401).send({ error: 'No token provided' });
    }

    const actualToken = token.replace('Bearer ', '');
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).send({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).send({ error: 'Invalid token' });
  }
};
module.exports = authMiddleware;