import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id, userId } = req.query;

    if (req.method === 'GET') {
        try {
            const skill = await prisma.skill.findUnique({
                where: { id: parseInt(id) },
                include: {
                    skillLevels: {
                        where: { userId: parseInt(userId) },
                        include: {
                            user: true,
                        },
                    },
                    category: true,
                },
            });
            res.status(200).json(skill);
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la récupération de la compétence' });
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}