import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = require("@repo/backend-common/config").JWT_SECRET;

interface jwtPayload extends jwt.JwtPayload {
  userId: string;
}

export function middleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variable");
    }

    const token = req.headers["authorization"];

    if (!token) {
      throw new Error("NO authorization header present");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as jwtPayload;

    if (!decoded.userId) {
      throw new Error("Invalid token");
    }

    req.userId = decoded.userId;

    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Unauthorized" });
  }
}
