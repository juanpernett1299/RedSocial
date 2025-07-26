const express = require('express');
require('dotenv').config();
const cors = require('cors');

const authMiddleware = require('./middleware/auth');
const userController = require('./controllers/user');
const app = express();
const port = process.env.PORT || 3003;

// Permito todos los orígenes por simplicidad
app.use(cors({ origin: '*' }));
app.use(express.json());

// Test route
app.get('/users/test', (req, res) => {
  res.send('Users microservice is running');
});

// Get user profile route
app.get('/users/:id', authMiddleware, userController.getUserProfile);

app.listen(port, () => {
  console.log(`Users service listening on port ${port}`);
});
