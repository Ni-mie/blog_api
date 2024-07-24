const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ username, email, password: hashedPassword });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid login credentials.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.header('Authorization', 'Bearer ' + token).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUserProfile = async (req, res) => {
  res.send(req.user);
};

module.exports = { registerUser, loginUser, getUserProfile };


//$2a$08$ejYiZ03G9IxXRmGevRY7ou.//xOoObcHYGUrnjLEnLz9GXA4TfduO
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzIxNzcxNjMxfQ.p4t6WQoQt9A9nGWg-wJpYN59CzqsufKsdqcvbBB5oLA
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzIxNzcxNzE5fQ.nc_R0SJ955W-eYLFolrTejLxRLJcB9_2R3nHW90yFQk