import { Request, Response } from "express"
import gmailService from "../services/gmail.service"
import asyncHandler from "../utils/asyncHandler"

const gmailController = {

    sendMail: asyncHandler(async (req: Request, res: Response) => {

        const userId = req.user._id

        const { from, to, subject, message } = req.body
        await gmailService.sendMail(userId, from, to, subject, message)
        return res.status(200).json({ success: true, message: `Mail sent to : ${to}` })
    }),

    handleCallback: asyncHandler(async (req: Request, res: Response) => {

        const data = JSON.parse(
            Buffer.from(req.body.message.data, "base64").toString("utf-8")
        );
        await gmailService.handleCallback(data.emailAddress, data.historyId)

        return res.status(200).json({ success: true, message: "Mail handled successfully" })
    })
}

export default gmailController