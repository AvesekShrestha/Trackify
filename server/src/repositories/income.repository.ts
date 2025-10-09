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

        return {success : true ,message : "Income created successfully" ,  data : income} 
    },
    async getById(incomeId: string) {

        const income = await Income.findById(incomeId)
        if (!income) throw new ErrorHandler("No such income", 400)

        return {success : true,message : "Income fetched" , data : income} 
    },
    async getAll(page: number, limit: number) {

        const skip = (page - 1) * limit

        const incomes = await Income.aggregate([
            {
                $project: {
                    source: 1,
                    amount: 1,
                    date: 1,
                    type: { $literal: "income" }
                }
            },
            { $sort: { date: -1 } },
            { $skip: skip },
            { $limit: limit }
        ]);

        if (!incomes) throw new ErrorHandler("No Income exists", 400)

        const totalRecords = await Income.countDocuments()
        const totalPages = Math.ceil(totalRecords / limit)

        return {
            success: true,
            message: "Income fetched successfully",
            data: incomes,
            pagination: {
                currentPage: page,
                limit,
                totalRecords,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        }
    },
    async update(payload: Partial<IIncomePayload>, incomeId: string) {

        const updatedIncome = await Income.findByIdAndUpdate(incomeId, { $set: payload }, { new: true })
        if (!updatedIncome) throw new ErrorHandler("Error while updating", 500)

        return {success : true, message : "Record Updated successfully" ,  data : updatedIncome} 
    },
    async delete(incomeId: string) {
        await Income.findByIdAndDelete(incomeId)
        return {success : true , message : "Income record deleted successfully"}
    }

}

export default incomeRepository
