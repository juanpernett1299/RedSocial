const express = require('express');
require('dotenv').config();
const postController = require('./controllers/posts');
const authMiddleware = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.get('/posts/test', (req, res) => {
  res.send('Posts microservice is running');
});

app.get('/posts', postController.getPaginatedPosts);

app.post('/posts', authMiddleware, postController.createPost);

app.post('/posts/:id/like', authMiddleware, postController.likePost);

app.listen(port, () => {
  console.log(`Posts service listening on port ${port}`);
});
