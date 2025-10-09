import asyncHandler from "../utils/asyncHandler";
import expenseService from "../services/expense.service";
import { Request , Response , NextFunction } from "express";

const expenseController = {

    create : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{
        const payload = req.body
        const userId = req.user._id
        
        // console.log(payload)

        const expense = await expenseService.create(payload, userId)
        return res.status(201).json({success : true, data : expense})
    }),
    getAll : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{
        
        const expenses = await expenseService.getAll()
        return res.status(200).json({success : true , data : expenses})
    }),
    getById : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{
        
        const expenseId = req.params.id

        const expense = await expenseService.getById(expenseId)
        return res.status(200).json({success : true, data : expense})
    }),
    update : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{
        
        const payload = req.body
        const expenseId = req.params.id

        const updatedexpense = await expenseService.update(payload , expenseId)

        return res.status(200).json({success : true , data : updatedexpense})
    }),
    delete : asyncHandler(async(req : Request , res : Response , next : NextFunction)=>{

        const expenseId = req.params.id

        await expenseService.delete(expenseId)
        return res.status(200).json({success : true, message : "expense deleted succesfully"})
    })
}


export default expenseController
