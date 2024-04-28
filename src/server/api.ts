export { };
const express = require('express');
const apiRouter = express.Router();

const { requireUser } = require("./utils")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { Request, Response, NextFunction } from 'express';
//<-----------------ADD A GAME----------------->
apiRouter.post("/add_game", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const reqUser = req as any;
        const newGame = await prisma.game.create({
            data: {
                storyteller: { connect: { id: reqUser.user.id } },
                name: name
            }
        });
        res.send(newGame);
    } catch (error) {
        next(error);
    }
});

//<-----------------GET ALL GAMES----------------->
apiRouter.get("/my_games", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqUser = req as any;
        const games = await prisma.game.findMany({
            where: { storytellerId: reqUser.user.id },
            include: {
                roles: true,
                players: true
            }
        })
        res.send(games)
    } catch (error) {
        next(error)
    }
});

module.exports = apiRouter;