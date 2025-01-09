const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
    // Créer des catégories
    const categories = [];
    for (let i = 0; i < 5; i++) {
        const category = await prisma.category.create({
            data: {
                name: faker.commerce.department(),
            },
        });
        categories.push(category);
    }

    // Créer des compétences
    const skills = [];
    for (let i = 0; i < 10; i++) {
        const skill = await prisma.skill.create({
            data: {
                name: faker.hacker.noun(),
                description: faker.lorem.sentence(),
                categoryId: categories[i % categories.length].id,
            },
        });
        skills.push(skill);
    }

    // Créer des niveaux de compétence pour chaque utilisateur
    const users = await prisma.user.findMany();
    for (const user of users) {
        for (const skill of skills) {
            await prisma.skillLevel.create({
                data: {
                    userId: user.id,
                    skillId: skill.id,
                    level: faker.number.int({ min: 1, max: 3 }),
                    progress: faker.number.float({ min: 0, max: 100 }),
                },
            });
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });