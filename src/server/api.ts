export {};
const express = require('express');
const apiRouter = express.Router();

const { requireUser } = require("./utils")

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<-----------------GET ALL CLASSES----------------->
apiRouter.get("/my_classes", requireUser, async (req: any, res: any, next: any) => {
    
 });

module.exports = apiRouter;