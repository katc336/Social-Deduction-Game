export { };
const express = require('express');
const apiRouter = express.Router();

const { requireUser } = require("./utils")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { Request, Response, NextFunction } from 'express';

//<------------------------------------------GAME ENDPOINTS------------------------------------------>
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
//<-----------------GET SINGLE GAME----------------->
apiRouter.get("/my_game/:id", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqUser = req as any;
        const gameId = parseInt(req.params.id);
        const game = await prisma.game.findUnique({
            where: { id: gameId, storytellerId: reqUser.user.id },
            include: {
                roles: true,
                players: true
            }
        })
        res.send(game)
    } catch (error) {
        next(error)
    }
});
//<--------------------------------DELETE GAME-------------------------------->
apiRouter.delete("/my_game/:id", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const game = await prisma.game.findUnique({
            where: { id },
        });
        if (!game) {
            return res.status(404).send("Game not found");
        }
        const deletedGame = await prisma.game.delete({
            where: { id },
        });
        res.send(deletedGame);
    } catch (error) {
        next(error);
    }
});



//<------------------------------------------ROLE ENDPOINTS------------------------------------------>
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
//<-----------------GET ALL ROLES----------------->
apiRouter.get("/roles", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqUser = req as any;
        const roles = await prisma.Role.findMany({
            where: { storytellerId: reqUser.user.id },
        })
        res.send(roles)
    } catch (error) {
        next(error)
    }
});
//<-----------------GET SINGLE ROLE----------------->
apiRouter.get("/role/:id", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqUser = req as any;
        const roleId = parseInt(req.params.id);
        const role = await prisma.role.findUnique({
            where: {
                roleId: roleId,
                storytellerId: reqUser.user.id
            }
        })
        res.send(role)
    } catch (error) {
        next(error)
    }
});
//<-----------------UPDATE ROLE----------------->
apiRouter.patch("/role/:id", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const updatedRole = await prisma.player.update({
            where: { playerId: Number(req.params.id) },
            data: {
                name: name || undefined,
            },
        });
        if (!updatedRole) {
            res.status(404).send({ message: "Player not found" });
        } else {
            res.send(updatedRole);
        }
    } catch (error) {
        next(error);
    }
});
//<--------------------------------DELETE ROLE-------------------------------->
apiRouter.delete("/role/:id", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId = Number(req.params.id);
        const role = await prisma.role.findUnique({
            where: { roleId: roleId },
        });
        if (!role) {
            return res.status(404).send("Role not found");
        }
        const deletedRole = await prisma.role.delete({
            where: { roleId },
        });
        res.send(deletedRole);
    } catch (error) {
        next(error);
    }
});



//<------------------------------------------PLAYER ENDPOINTS------------------------------------------>
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
//<-----------------GET SINGLE PLAYER----------------->
apiRouter.get("/player/:id", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerId = parseInt(req.params.id);
        const player = await prisma.player.findUnique({
            where: {
                playerId: playerId
            },
            include: {
                role: true,
            }
        })
        res.send(player)
    } catch (error) {
        next(error)
    }
});

//<-----------------UPDATE PLAYER----------------->
apiRouter.patch("/player/:id", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, roleName, gameId } = req.body;
        const role = await prisma.role.findFirst({
            where: {
                name: roleName,
                gameId: gameId
            }
        });
        if (!role) {
            // If role does NOT exist, create a new role
            const reqUser = req as any;
            const newRole = await prisma.role.create({
                data: {
                    storyteller: { connect: { id: reqUser.user.id } },
                    name: roleName,
                   //Remove gameId: an updated role will only be attached to a player, not the game
                }
            });
            const updatedPlayer = await prisma.player.update({
                where: { playerId: Number(req.params.id) },
                data: {
                    name: name,
                    role: { connect: { roleId: newRole.roleId } }
                }
            });
            res.send({ newRole, updatedPlayer });
        } else {  // If role DOES exist, create a new role
            const updatedPlayer = await prisma.player.update({
                where: { playerId: Number(req.params.id) },
                data: {
                    name: name,
                    role: { connect: { roleId: role.roleId } }
                }
            });
            res.send(updatedPlayer);
        }
    } catch (error) {
        next(error);
    }
});
//<--------------------------------UPDATE PLAYER'S CHARACTER'S DEATH-------------------------------->
apiRouter.patch("/player_death/:id", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const player = await prisma.player.findUnique({
            where: { playerId: Number(req.params.id) },
        });
        if (player.alive === true) {
            const updatedPlayer = await prisma.player.update({
                data: { alive: false }
            });
            res.send(updatedPlayer);
        } else {
            const updatedPlayer = await prisma.player.update({
                data: { alive: false }
            });
            res.send(updatedPlayer);
        }
    } catch (error) {
        next(error);
    }
});


//<--------------------------------DELETE PLAYER-------------------------------->
apiRouter.delete("/player/:id", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerId = Number(req.params.id);
        const player = await prisma.player.findUnique({
            where: { playerId },
        });
        if (!player) {
            return res.status(404).send("Player not found");
        }
        const deletedPlayers = await prisma.players.delete({

        });
        res.send(deletedPlayers);
    } catch (error) {
        next(error);
    }
});

//<--------------------------------DELETE ALL PLAYERS FOR A GAME-------------------------------->
apiRouter.delete("/game_players/:id", requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameId = Number(req.params.id);
        const game = await prisma.game.findUnique({
            where: { id: gameId },
        });
        if (!game) {
            return res.send(404).send("Game not found");
        } else {
            const deletedPlayers = await prisma.player.deleteMany({
                where: { gameId: gameId },
            });
            res.send({ game, deletedPlayers });
        }
    } catch (error) {
        next(error);
    }
});


module.exports = apiRouter;