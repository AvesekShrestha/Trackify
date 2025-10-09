import asyncHandler from "../utils/asyncHandler";
import expenseService from "../services/expense.service";
import { Request , Response } from "express";

const expenseController = {

    create : asyncHandler(async(req : Request , res : Response)=>{
        const payload = req.body
        const userId = req.user._id
        
        const result = await expenseService.create(payload, userId)
        return res.status(201).json(result)
    }),
    getAll : asyncHandler(async(req : Request , res : Response)=>{
        
        const page : number = req.query.page ? Number(req.query.page) : 1
        const limit : number = req.query.limit ? Number(req.query.limit) : 8

        const result = await expenseService.getAll(page , limit)
        return res.status(200).json(result)
    }),
    getById : asyncHandler(async(req : Request , res : Response)=>{
        
        const expenseId = req.params.id

        const result = await expenseService.getById(expenseId)
        return res.status(200).json(result)
    }),
    update : asyncHandler(async(req : Request , res : Response)=>{
        
        const payload = req.body
        const expenseId = req.params.id

        const result = await expenseService.update(payload , expenseId)

        return res.status(200).json(result)
    }),
    delete : asyncHandler(async(req : Request , res : Response)=>{

        const expenseId = req.params.id

        const result = await expenseService.delete(expenseId)
        return res.status(200).json(result)
    })
}


export default expenseController
