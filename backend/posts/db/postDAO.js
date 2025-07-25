const prisma = require('./prisma');

const getPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id }
  });
  return post;
};

const getPaginatedPosts = async (page, size) => {
  const posts = await prisma.post.findMany({
    skip: (page - 1) * size,
    take: size,
    // Uso select para evitar que se incluya el user_id en la respuesta ya que se incluye en el usuario
    select: {
      id: true,
      message: true,
      created_at: true,
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          alias: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return { elements: posts, total: posts.length, page, size };
};

const createPost = async (message, userId) => {
  const newPost = await prisma.post.create({
    data: {
      message: message,
      user_id: userId
    }
  });
  return newPost;
};

module.exports = {
  getPaginatedPosts,
  createPost,
  getPostById
};
