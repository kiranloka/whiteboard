import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = require("@repo/backend-common/config");

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function middleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"] || "";

  const decoded = jwt.verify(token, JWT_SECRET as string) as { userId: string };

  if (decoded) {
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
}
