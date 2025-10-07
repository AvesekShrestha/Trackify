import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import userService from "../services/user.service";

const userController = {

    me: asyncHandler(async (req: Request, res: Response) => {
        const userId: string = req.user._id
        const user = await userService.getById(userId)
        return res.status(200).json({ success: true, data: user })
    })
}


export default userController
