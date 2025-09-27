import mongoose from "mongoose"
import { describe } from "node:test"
import z, { date } from "zod"

const ZodExpense = z.object({

    amount : z.number().positive("Amount should be postive number"),
    category : z.enum(["Food" , "Transport", "Entertainment", "Health" , "Shopping", "Bills" , "Others"]),
    description : z.string().trim(),
    date : z.date(),
})

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

interface ExpensePayload { 
    amount : number
    category : ExpenseCategory
    description? : string
    date : Date
}



export {ExpenseCategory , IExpense , ExpensePayload , ZodExpense}