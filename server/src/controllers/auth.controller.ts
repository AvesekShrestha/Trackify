import authService from "../services/auth.service";
import asyncHandler from "../utils/asyncHandler";
import { Request , Response , NextFunction } from "express";

const authController = {

    register : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{

        const payload = req.body
        const user = await authService.register(payload)
        return res.status(201).json({success : true , data : user})
    }),
    login : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{

        const payload = req.body
        const {accessToken , refreshToken} = await authService.login(payload)

        return res.cookie("accessToken" , accessToken).cookie("refreshToken", refreshToken).status(200).json({accessToken , refreshToken})
    }),
    logout : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{

        res.clearCookie("accessToken").clearCookie("refreshToken").status(200).json({success : true , message : "Logged out successfully"})
    }),
    refresh : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{

        const refreshToken = req.cookies.refreshToken || req.body.refreshToken
        const accessToken = await authService.refresh(refreshToken)

        res.cookie("accessToken" , accessToken).status(200).json({success : true , data : accessToken})
    })
 
}

export default authController