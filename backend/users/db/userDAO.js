const prisma = require('./prisma');

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  });
  return user;
};

module.exports = {
  getUserById
};
