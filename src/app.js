require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const sequelize = require('./config/database');  // Import sequelize


const app = express();
app.use(bodyParser.json());

app.use('/api/users', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', commentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

const startServer = async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Database connection established.');
    await sequelize.sync(); 
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
