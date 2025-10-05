import reportService from "../services/report.service"
import asyncHandler from "../utils/asyncHandler"
import { Request , Response } from "express"

const reportController = {
    recentTransaction : asyncHandler(async (req : Request , res : Response)=>{
        const userId = req.user._id

        const transactions = await reportService.recentTransaction(userId)
        return res.status(200).json({success : true , data : transactions})
    }),
    availableBalance : asyncHandler(async (req : Request , res : Response)=>{
        const userId = req.user._id

        const balance = await reportService.availableBalance(userId)
        return res.status(200).json({success : true , data : balance[0]})
    })
}

export default reportController