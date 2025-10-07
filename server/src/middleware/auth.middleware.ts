import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { secret } from "../config/constant";

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
        if(!token) return res.status(401).json({code : "NO_TOKEN" , message : "No access token found"})

        const payload = jwt.verify(token, secret) as IJwtPayload;
        req.user = payload;

        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) return res.status(401).json({code : "TOKEN_EXPIRED", message : "Token has expired" }) 
        return res.status(401).json({code : "INVALID_TOKEN", message : "Invalid token"})
    }
};

export default authenticate;

