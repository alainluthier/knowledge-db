const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const users = [
    {
        id: 1,
        email: 'user01@knowledge.com',
        name: 'Paul Norton',
        password: 'user01',
        role: 'viewer'
    },
    {
        id: 2,
        email: 'editor01@knowledge.com',
        name: 'Antonio Santos',
        password: 'editor01',
        role: 'editor'
    },
    {
        id: 3,
        email: 'editor02@knowledge.com',
        name: 'Lizeth Rios',
        password: 'editor02',
        role: 'editor'
    }
];
const categories = [
    {
        id: 1,
        category: 'System Error',
        description: 'System or web application bugs'
    },
    {
        id: 2,
        category: 'Functionality',
        description: 'Problems with lack of functionalities that the web application currently does not have'
    },
    {
        id: 3,
        category: 'Database Error',
        description: 'Problems with the database that do not allow reading or saving records'
    }
]
const problems = [
    {
        id: 1,
        problem: 'Registration error Code:E0015',
        solution: 'Clear the browser cache and try to register from another internet browser.',
        categoryId: 1
    },
    {
        id: 2,
        problem: 'Sending notification error Code:E0041',
        solution: 'The email has been sent but there is no confirmation, it is probably because it is in the SPAM tray, ask the user to check their tray.',
        categoryId: 1
    },
    {
        id: 3,
        problem: 'I cannot check the details of who sent the notification',
        solution: 'It is a lack of functionality in the application and we are working on implementing it in the next deployment to production. We can manually send the information by accessing the Notifications table database.',
        categoryId: 2
    },
    {
        id: 4,
        problem: 'I cannot view the pdf of the report',
        solution: 'The database record probably has special characters. You must enter the Reports table and delete the special characters in every column',
        categoryId: 3
    },
    {
        id: 5,
        problem: 'Statistical reports take a long time to load',
        solution: 'It is due to the current version of the database that cannot work with more than 1 million records, adjustments are being made to migrate to a next version, for now the reports can be generated manually.',
        categoryId: 3
    }
]
const bcrypt = require('bcrypt');
async function seedUsers() {
    try {

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPass = await bcrypt.hash(user.password, 10);
                return prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name,
                        password: hashedPass,
                        role: user.role
                    }

                })
            })
        )
        console.log(`Seeded ${insertedUsers.length} users`);
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}
async function seedCategories() {
    try {
        const insertedCategories = await Promise.all(
            categories.map(async (cat) => {
                return prisma.category.create({
                    data: cat
                })
            })
        )
        console.log(`Seeded ${insertedCategories.length} categories`);
    } catch (error) {
        console.error('Error seeding categories:', error);
        throw error;
    }
}
async function seedProblems() {
    try {
        const insertedProblems = await Promise.all(
            problems.map(async (pro) => {
                return prisma.problem.create({
                    data: {
                        problem: pro.problem,
                        solution: pro.solution,
                        category: {connect:{id:pro.categoryId}},
                        categoryId: pro.categoryId
                    },
                    },
                )
            })
        )
        console.log(`Seeded ${insertedProblems.length} users`);
    } catch (error) {
        console.error('Error seeding problems:', error);
        throw error;
    }
}
async function main() {
    //await seedUsers();
    await seedCategories();
    await seedProblems();

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })