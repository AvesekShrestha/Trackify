import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { secret } from "../config/constant";
import { resourceUsage } from "process";

declare global {
  namespace Express {
    interface Request {
      user: IJwtPayload;
    }
  }
}

interface IJwtPayload {
  _id: string;
  username: string;
  email: string;
}

const PUBLIC_PATHS = [
  "/auth/register",
  "/auth/login",
  "/auth/forgot-password",
  "/gmail/callback",
];

const authenticate = (req: Request, res: Response, next: NextFunction) => {

  if (PUBLIC_PATHS.includes(req.path)) return next();

  try {
    const token = req.cookies?.accessToken;
    if (!token) return next(new ErrorHandler("Access token required", 401));

    const payload = jwt.verify(token, secret) as IJwtPayload;
    req.user = payload;

    next();
  } catch (err) {
    if(err instanceof TokenExpiredError) return next(new ErrorHandler("Access Token Expired" , 401))
    return next(new ErrorHandler("Invalid token", 401));
  }
};

export default authenticate;
