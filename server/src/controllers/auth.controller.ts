import authService from "../services/auth.service";
import asyncHandler from "../utils/asyncHandler";
import { Request , Response , NextFunction } from "express";

const authController = {

    register : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{

        const payload = req.body
        const user = await authService.register(payload)
        return res.status(201).json({success : true , data : user})
    })
}

export default authController