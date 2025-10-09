import mongoose from "mongoose"
import z from "zod"

const ZodExpense = z.object({

    amount : z.number().positive("Amount should be postive number"),
    category : z.enum(["food" , "transport", "entertainment", "health" , "shopping", "bills" , "others"]),
    description : z.string().trim().optional(),
})

const ZodExpenseUpdate = ZodExpense.partial().refine((data)=> Object.keys(data).length > 0 , "At least on field should be passed")

enum ExpenseCategory {
    FOOD = "food",
    TRANSPORT = "transport",
    ENTERTAINMENT = "entertainment",
    HEALTH = "health",
    SHOPPING = "shopping",
    BILLS = "bills",
    OTHER = "other",
}

interface IExpense {
    amount : number
    category : ExpenseCategory
    description? : string
    date : Date
    userId : mongoose.Schema.Types.ObjectId
}

interface IExpensePayload{
    amount : number
    category : ExpenseCategory
    description? : string
    date? : Date
}

interface ExpensePayload { 
    amount : number
    category : ExpenseCategory
    description? : string
    date : Date
}



export {ExpenseCategory , IExpense , ExpensePayload , ZodExpense, ZodExpenseUpdate, IExpensePayload}

