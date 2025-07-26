const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Hash passwords
  const passwordJane = await bcrypt.hash('password123', 10);
  const passwordJohn = await bcrypt.hash('password456', 10);
  const passwordAlice = await bcrypt.hash('password789', 10);
  const passwordBob = await bcrypt.hash('password101', 10);

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

  const user3 = await prisma.user.create({
    data: {
      username: 'alice_wonder',
      password: passwordAlice,
      first_name: 'Alice',
      last_name: 'Wonder',
      birth_date: new Date('1992-11-30'),
      alias: 'Ali',
      posts: {
        create: {
          message: 'Exploring this new platform!'
        }
      }
    }
  });

  const user4 = await prisma.user.create({
    data: {
      username: 'bob_builder',
      password: passwordBob,
      first_name: 'Bob',
      last_name: 'Builder',
      birth_date: new Date('1980-07-25'),
      alias: 'Bobby',
      posts: {
        create: {
          message: 'Can we fix it? Yes we can!'
        }
      }
    }
  });

  console.log(`Created user with id: ${user1.id} (username: ${user1.username})`);
  console.log(`Created user with id: ${user2.id} (username: ${user2.username})`);
  console.log(`Created user with id: ${user3.id} (username: ${user3.username})`);
  console.log(`Created user with id: ${user4.id} (username: ${user4.username})`);
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
