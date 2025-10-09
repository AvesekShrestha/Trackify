import incomeService from "../services/income.service";
import asyncHandler from "../utils/asyncHandler";
import { Request , Response } from "express";

const incomeController = {

    create : asyncHandler(async(req : Request , res : Response)=>{
        const payload = req.body
        const userId = req.user._id

        const result = await incomeService.create(payload, userId)
        return res.status(201).json(result)
    }),
    getAll : asyncHandler(async(req : Request , res : Response)=>{
        
        const page : number = req.query.page ? Number(req.query.page) : 1
        const limit : number = req.query.limit ? Number(req.query.limit) : 8

        const result = await incomeService.getAll(page, limit)
        return res.status(200).json(result)
    }),
    getById : asyncHandler(async(req : Request , res : Response)=>{
        
        const incomeId = req.params.id
        const result = await incomeService.getById(incomeId)
        return res.status(200).json(result)
    }),
    update : asyncHandler(async(req : Request , res : Response)=>{
        
        const payload = req.body
        const incomeId = req.params.id

        const result = await incomeService.update(payload , incomeId)

        return res.status(200).json(result)
    }),
    delete : asyncHandler(async(req : Request , res : Response)=>{

        const incomeId = req.params.id

        const result = await incomeService.delete(incomeId)
        return res.status(200).json(result)
    })
}


export default incomeController
