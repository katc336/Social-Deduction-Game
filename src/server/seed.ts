const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

//NOTE: Now, the seed is just to clear the database during testing
const seed = async () => {
    console.log("Seeding the database.");
    await prisma.player.deleteMany();
    await prisma.role.deleteMany();
    await prisma.game.deleteMany();
    await prisma.user.deleteMany();

    try {
       
    } catch (error) {
        console.error(error)
    }
    console.log("Database seeded!")
}

seed().then(async () => {
    await prisma.$disconnect();
}).catch(async (error) => {
    console.error(error)
    await prisma.$disconnect();
    process.exit(1)
})