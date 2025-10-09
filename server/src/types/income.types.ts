import mongoose from "mongoose"
import z from "zod"

const ZodIncome = z.object({
  source : z.enum(["salary" , "freelance" , "investment" , "business" , "others"]),
  amount :  z.number().positive({message : "Income amount should be positive"}),
  description : z.string().trim().optional(),
})

const ZodIncomeUpdate = ZodIncome.partial().refine((data)=> Object.keys(data).length > 0 , {message : "At least one filed should be provided"})

enum IncomeSource {
  SALARY = "salary",
  FREELANCE = "freelance",
  INVESTMENT = "investment",
  BUSINESS = "business",
  OTHER = "other",
}

interface IIncome{
    source : IncomeSource
    amount : number
    description? : string
    date : Date
    userId : mongoose.Schema.Types.ObjectId
}

interface IIncomePayload{
  source : IncomeSource
  amount : number
  description? : string
  date? : Date
  
}


export {IIncome, IncomeSource , ZodIncome, IIncomePayload, ZodIncomeUpdate}

