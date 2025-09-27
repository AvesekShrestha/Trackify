import mongoose from "mongoose"
import z from "zod"

const ZodIncome = z.object({
  source : z.enum(["Salary" , "Freelance" , "Investment" , "Business" , "Others"]),
  amount :  z.number().positive({message : "Income amount should be positive"}),
  description : z.string().trim().optional(),
  userId : z.string().trim()

})

enum IncomeSource {
  SALARY = "Salary",
  FREELANCE = "Freelance",
  INVESTMENT = "Investment",
  BUSINESS = "Business",
  OTHER = "Other",
}

interface IIncome{
    source : IncomeSource
    amount : number
    description? : string
    date : Date
    userId : mongoose.Schema.Types.ObjectId
}

export {IIncome, IncomeSource , ZodIncome}

