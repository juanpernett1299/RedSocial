const express = require('express');
require('dotenv').config();
const cors = require('cors');
const authController = require('./controllers/auth');

const app = express();
const port = process.env.PORT || 3001;

// Permito todos los orígenes por simplicidad
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/auth/test', (req, res) => {
  res.send('Auth microservice is running');
});

// Login route
app.post('/auth/login', authController.login);

app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});
