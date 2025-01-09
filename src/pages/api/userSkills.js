import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const userId = req.query.userId;

        try {
            const skills = await prisma.skillLevel.findMany({
                where: { userId: parseInt(userId) },
                include: {
                    skill: {
                        include: {
                            category: true,
                        },
                    },
                },
            });
            res.status(200).json(skills);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération des compétences' });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}