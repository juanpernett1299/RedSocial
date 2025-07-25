const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Hash passwords
  const passwordJane = await bcrypt.hash('password123', 10);
  const passwordJohn = await bcrypt.hash('password456', 10);

  // Create users and their posts
  const user1 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      password: passwordJane,
      first_name: 'Jane',
      last_name: 'Doe',
      birth_date: new Date('1990-01-15'),
      alias: 'Jany',
      posts: {
        create: {
          message: 'Hello world! This is my first post.'
        }
      }
    }
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'john_smith',
      password: passwordJohn,
      first_name: 'John',
      last_name: 'Smith',
      birth_date: new Date('1985-05-20'),
      alias: 'Johnny',
      posts: {
        create: {
          message: 'Just setting up my new social media account!'
        }
      }
    }
  });

  console.log(`Created user with id: ${user1.id} (username: ${user1.username})`);
  console.log(`Created user with id: ${user2.id} (username: ${user2.username})`);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
