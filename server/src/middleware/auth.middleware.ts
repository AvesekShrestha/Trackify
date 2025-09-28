import { NextFunction, Request , Response } from "express";
import { IUser } from "../types/user.types";
import ErrorHandler from "../utils/errorHandler";
import jwt from "jsonwebtoken"
import { secret } from "../config/constant";

declare global {
    namespace Express {
        interface Request{
            user : IJwtPayload
        }
    }
}

interface IJwtPayload{
    _id : string,
    username : string,
    email : string
}


const authenticate = async(req : Request , res : Response , next : NextFunction) =>{

    const token = req.cookies.accessToken
    if(!token) next(new ErrorHandler("Access token required" , 401))
    
    const paylaod = jwt.verify(token , secret) as IJwtPayload
    req.user = paylaod

    next()
}

export default authenticate