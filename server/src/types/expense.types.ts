import mongoose from "mongoose"
import z from "zod"

const ZodExpense = z.object({

    amount : z.number().positive("Amount should be postive number"),
    category : z.enum(["Food" , "Transport", "Entertainment", "Health" , "Shopping", "Bills" , "Others"]),
    description : z.string().trim().optional(),
})

const ZodExpenseUpdate = ZodExpense.partial().refine((data)=> Object.keys(data).length > 0 , "At least on field should be passed")

enum ExpenseCategory {
    FOOD = "Food",
    TRANSPORT = "Transport",
    ENTERTAINMENT = "Entertainment",
    HEALTH = "Health",
    SHOPPING = "Shopping",
    BILLS = "Bills",
    OTHER = "Other",
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
    description : string
}

interface ExpensePayload { 
    amount : number
    category : ExpenseCategory
    description? : string
    date : Date
}



export {ExpenseCategory , IExpense , ExpensePayload , ZodExpense, ZodExpenseUpdate, IExpensePayload}