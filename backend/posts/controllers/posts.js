const postDAO = require('../db/postDAO');
const likeDAO = require('../db/likeDAO');

const getPaginatedPosts = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const size = parseInt(req.query.size, 10) || 10;
  const paginatedPosts = await postDAO.getPaginatedPosts(page, size);
  res.json(paginatedPosts);
};

const createPost = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id; // Obtenido del token JWT a través del middleware

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const post = await postDAO.createPost(message, userId);
  res.status(201).json(post);
};

const likePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id, 10);
    const userId = req.user.id; // Obtenido del token JWT

    const post = await postDAO.getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const like = await likeDAO.likePost(postId, userId);

    res.status(201).json(like);
  } catch (error) {
    // Si el error es por la restricción 'unique' de Prisma (P2002)
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'You have already liked this post' });
    }
    console.error('Like post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getPaginatedPosts,
  createPost,
  likePost
};
