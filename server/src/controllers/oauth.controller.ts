import asyncHandler from "../utils/asyncHandler"
import { Request, Response, NextFunction } from "express"
import oauthService from "../services/oauth.service"

const oauthController = {

    getOAuthUrl: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const userId = req.user._id
        const url = await oauthService.getOAuthUrl()
        return res.status(200).json({ url })
    }),

    handleOAuthCallback: asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        const userId = req.user._id
        const code = req.query.code as string;

        const message = await oauthService.handleOAuthCallback(code, userId)
        
        return res.status(200).json(message);
    }),

}

export default oauthController
