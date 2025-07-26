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

const unlikePost = async (postId, userId) => {
  const deletedLike = await prisma.like.deleteMany({
    where: {
      post_id: postId,
      user_id: userId
    }
  });
  return deletedLike;
};

module.exports = {
  likePost,
  unlikePost
};
