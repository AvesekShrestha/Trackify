import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

const userController = {

    me: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user

    })
}