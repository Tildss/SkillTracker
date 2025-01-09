import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const users = await prisma.user.findMany();
            const randomUser = users[Math.floor(Math.random() * users.length)];
            res.status(200).json(randomUser);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur aléatoire' });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}