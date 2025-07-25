const prisma = require('./prisma');

const likePost = async (postId, userId) => {
  const like = await prisma.like.create({
    data: {
      post_id: postId,
      user_id: userId
    }
  });
  return like;
};

module.exports = {
  likePost
};
