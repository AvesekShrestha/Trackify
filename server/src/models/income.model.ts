import mongoose from "mongoose";
import { IIncome, IncomeSource } from "../types/income.types";

const incomeSchema = new mongoose.Schema<IIncome>({
    source : {
        type : String,
        enum : Object.values(IncomeSource),
        required: true
    },
    amount : {
        type : Number,
        required : true
    },
    description : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now(),
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : true
    }
})

const Income = mongoose.model<IIncome>("income" , incomeSchema)

export default Income