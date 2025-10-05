import mongoose from "mongoose";
import { ExpenseCategory, IExpense } from "../types/expense.types";

const expenseSchema = new mongoose.Schema<IExpense>({
    amount : {
        type : Number,
        required : true,
    },
    category : {
        type : String,
        enum : Object.values(ExpenseCategory),
        required : true
    },
    description : {
        type : String,   
    },
    date : {
        type : Date,
        default : Date.now(),
        required: true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
})


const Expense = mongoose.model<IExpense>("expense" , expenseSchema)

export default Expense
