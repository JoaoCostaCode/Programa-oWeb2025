import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const saveScore = async (req: Request, res: Response) => {
  const { score } = req.body;
  const user = (req.session as { user?: { id: string; email: string; name: string } }).user;

  if (!user) {
    res.status(401).json({ error: 'Usuário não autenticado' });
    return;
  }

  try {
    await prisma.game_sessions.create({
      data: {
        user_id: user.id,
        score: parseInt(score)
      }
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar score' });
  }
};

const showRanking = async (req: Request, res: Response) => {
  try {
   
    const ranking = await prisma.game_sessions.groupBy({
      by: ['user_id'],
      _sum: { score: true },
      orderBy: {
        _sum: {
          score: 'desc',
        },
      },
      take: 10,
    });

    const usersIds = ranking.map(r => r.user_id);

    const users = await prisma.user.findMany({
      where: { id: { in: usersIds } },
      select: { id: true, name: true, email: true },
    });

    const rankingComUsuario = ranking.map(r => {
      const user = users.find(u => u.id === r.user_id);
      return {
        userId: r.user_id,
        userName: user?.name || 'Usuário Desconhecido',
        totalScore: r._sum.score,
      };
    });

    return res.render('main/ranking', { ranking: rankingComUsuario });

  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar ranking');
  }
};

export default { saveScore, showRanking };
