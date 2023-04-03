
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const users = [];

    
    for (let i = 0; i < 10; i++) {
        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            nickname: faker.internet.userName(),
        });
    }

    await Promise.all(
        users.map(async (user) => {
            const createdUser = await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                },
            })
            await prisma.perfil.create({
                data: {
                    nickname: user.nickname,
                    user_id: createdUser.id,
                }
            });
        })
    )
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
