const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: {
      username: username
    }
  });
};

module.exports = {
  findUserByUsername
};
