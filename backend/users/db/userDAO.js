const prisma = require('./prisma');

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      username: true,
      alias: true,
      first_name: true,
      last_name: true,
      birth_date: true,
      created_at: true
    },
    where: {
      id: id
    }
  });
  return user;
};

module.exports = {
  getUserById
};
