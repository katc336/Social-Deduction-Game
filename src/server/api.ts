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
        const newRole = await prisma.game.create({
            data: {
                storyteller: { connect: { id: reqUser.user.id } },
                name: name
            }
        });
        res.send(newRole);
    } catch (error) {
        next(error);
    }
});
//<-----------------ADD ROLES----------------->
apiRouter.post("/add_roles", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, gameId } = req.body;
        const reqUser = req as any;
        const newRole = await prisma.role.create({
            data: {
                storytellerId: reqUser.user.id,
                name: name,
                gameId: gameId
            }
        });
        res.send(newRole);
    } catch (error) {
        next(error);
    }
});
//<-----------------ADD PLAYER----------------->
apiRouter.post("/add_player", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, gameId, roleId } = req.body;
        const newPlayer = await prisma.player.create({
            data: {
                name: name,
                gameId: gameId,
                roleId: roleId
            }
        });
        res.send(newPlayer);
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