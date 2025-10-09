import reportService from "../services/report.service"
import asyncHandler from "../utils/asyncHandler"
import { Request, Response } from "express"

const reportController = {
    recentTransaction: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user._id

        const result = await reportService.recentTransaction(userId)
        return res.status(200).json(result)
    }),
    balanceReport: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user._id

        const result = await reportService.balanceReport(userId)
        return res.status(200).json(result)
    }),
    monthlyIncomeReport: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user._id

        const result = await reportService.monthlyIncomeReport(userId)
        return res.status(200).json(result)
    }),
    monthlyExpenseReport: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user._id

        const result = await reportService.monthlyExpenseReport(userId)
        return res.status(200).json(result)
    })
}

export default reportController
