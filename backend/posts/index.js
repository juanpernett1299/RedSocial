const express = require('express');
require('dotenv').config();
const cors = require('cors');
const postController = require('./controllers/posts');
const authMiddleware = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3002;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/posts/test', (req, res) => {
  res.send('Posts microservice is running');
});

app.get('/posts', authMiddleware, postController.getPaginatedPosts);

app.post('/posts', authMiddleware, postController.createPost);

app.post('/posts/:id/like', authMiddleware, postController.likePost);

app.delete('/posts/:id/like', authMiddleware, postController.unlikePost);

app.listen(port, () => {
  console.log(`Posts service listening on port ${port}`);
});
