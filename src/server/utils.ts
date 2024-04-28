export {};
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<--------------------------------AUTHORIZATION MIDDLEWARE-------------------------------->
const authMiddleware = async (req: any, res: any, next: any ) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    // continue...
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await prisma.user.findUnique({
          where: { id }
        });
        next();
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
};

// requireUser error
const requireUser = (req: any, res: any, next: any) => {
  if (!req.user) {
    res.status(401).send("You need an account to do that action")
  }
  else next();
};

module.exports = {
  requireUser,
  authMiddleware
}