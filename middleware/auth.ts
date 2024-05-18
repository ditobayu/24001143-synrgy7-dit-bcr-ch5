import { Request, Response, NextFunction } from "express";
import { createClient } from "redis";
import { client } from "..";

// const redisClient = createClient();

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  console.log(req.cookies);
  console.log(req.cookies.token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const session = await client.get(token);
    if (session) {
      next();
    } else {
      res.status(401).json({ message: "Session expired or invalid" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// generate random token
const generateToken = () => {
  return Math.random().toString(36).substr(2);
};

export { authenticate, generateToken };
