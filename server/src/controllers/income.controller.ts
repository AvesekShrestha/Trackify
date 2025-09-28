import incomeService from "../services/income.service";
import asyncHandler from "../utils/asyncHandler";
import { Request , Response , NextFunction } from "express";

const incomeController = {

    create : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{
        const payload = req.body
        const userId = req.user._id

        const income = await incomeService.create(payload, userId)
        return res.status(201).json({success : true, data : income})
    }),
    getAll : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{
        
        const incomes = await incomeService.getAll()
        return res.status(200).json({success : true , data : incomes})
    }),
    getById : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{
        
        const incomeId = req.params.id

        const income = await incomeService.getById(incomeId)
        return res.status(200).json({success : true, data : income})
    }),
    update : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{
        
        const payload = req.body
        const incomeId = req.params.id

        const updatedIncome = await incomeService.update(payload , incomeId)

        return res.status(200).json({success : true , data : updatedIncome})
    }),
    delete : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{

        const incomeId = req.params.id

        await incomeService.delete(incomeId)
        return res.status(200).json({success : true, message : "Income deleted succesfully"})
    })
}


export default incomeController