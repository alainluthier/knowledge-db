const { db } = require('@vercel/postgres');

const {users,categories,problems} = require('../data/placeholder-data.js')
//FIRST, FOLLOW THE STEPS IN CHAPTER 6 OF THE TUTORIAL, AND BEFORE SEED THE DATABASE IN TE THERMINAL NEED
//TO BE TYPED : " npm i @vercel/postgres "

const bcrypt = require('bcrypt');


async function seedUserTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Crear la tabla "user" si no existe
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users__ (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email VARCHAR(255) NOT NULL unique,
        name varchar(255) not null,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL
      );
    `;

        console.log('Table "user" created');

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
              const hashedPassword = await bcrypt.hash(user.password, 10);
              return client.sql`
              INSERT INTO users__ (id,email,name,password, role)
              VALUES (${user.id},${user.email}, ${user.name}, ${hashedPassword},${user.role})
              ON CONFLICT (id) DO NOTHING;
            `;
            }),
          );
      
        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
        };
    } catch (error) {
        console.error('Error seeding "user":', error);
        throw error;
    }
}

async function seedCategoriesTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        category VARCHAR(45) NOT NULL,
        description VARCHAR(2000) NULL
      );
    `;

        console.log('Table "categories" created');

        // Insert data into the "item" table
        const insertedCategories = await Promise.all(
            categories.map(
          (cat) => client.sql`
          INSERT INTO categories (id, category, description)
          VALUES (${cat.id},${cat.category}, ${cat.description})
          ON CONFLICT (id) DO NOTHING;
        `,
            ),
        );
  
        console.log(`Seeded ${insertedCategories.length} categories`);

        return {
            createTable
        };
    } catch (error) {
        console.error('Error seeding "categories":', error);
        throw error;
    }
}

async function seedProblemsTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS problems (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        problem varchar(1024) NULL,
        solution varchar(2000) NULL,
        category_id uuid not null
      );
    `;

        console.log('Table "problems" created');
        // Insert data into the "item" table
        const insertedProblems = await Promise.all(
            problems.map(
              (problem) => client.sql`
              INSERT INTO problems (id, problem, solution, category_id)
              VALUES (${problem.id}, ${problem.problem},${problem.solution}, ${problem.category_id})
              ON CONFLICT (id) DO NOTHING;
            `,
                ),
            );

        console.log(`Seeded ${insertedProblems.length} problems`);

        return {
            createTable
        };
    } catch (error) {
        console.error('Error to seed table "problems":', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUserTable(client);
    await seedCategoriesTable(client);
    await seedProblemsTable(client);

    await client.end();
}

main().catch((err) => {
    console.error('Something went wrong with database creation', err);
});
