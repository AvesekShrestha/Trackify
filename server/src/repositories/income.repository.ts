import Income from "../models/income.model";
import { IIncomePayload } from "../types/income.types";
import ErrorHandler from "../utils/errorHandler";

const incomeRepository = {

    async create(paylaod: IIncomePayload, userId: string) {
        const income = new Income({
            ...paylaod,
            date: Date.now(),
            userId: userId
        })

        await income.save()

        return income
    },
    async getById(incomeId: string) {

        const income = await Income.findById(incomeId)
        if (!income) throw new ErrorHandler("No such income", 400)

        return income
    },
    async getAll() {

        const incomes = await Income.aggregate([{$project : {source : 1 , amount : 1 , date : 1 , type : "income"}}])
        if (!incomes || incomes.length == 0) throw new ErrorHandler("No Income exists", 400)

        return incomes
    },
    async update(payload: Partial<IIncomePayload>, incomeId: string) {

        const updatedIncome = await Income.findByIdAndUpdate(incomeId , {$set : payload}, {new : true})
        if (!updatedIncome) throw new ErrorHandler("Error while updating", 500)

        return updatedIncome
    },
    async delete(incomeId : string){
        await Income.findByIdAndDelete(incomeId)
    }

}

export default incomeRepository
