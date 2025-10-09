import ErrorHandler from "../utils/errorHandler";
import { IExpensePayload } from "../types/expense.types";
import Expense from "../models/expense.model";

const expenseRepository = {

    async create(paylaod: IExpensePayload, userId: string) {
        const expense = new Expense({
            ...paylaod,
            date: Date.now(),
            userId: userId
        })

        await expense.save()

        return { success: true, message: "Expense created successfully", data: expense }
    },
    async getById(expenseId: string) {

        const expense = await Expense.findById(expenseId)
        if (!expense) throw new ErrorHandler("No such expense", 400)

        return { success: true, message: "Expense fetched successfully", data: expense }
    },
    async getAll(page: number, limit: number) {

        const skip = (page - 1) * limit

        const totalRecords = await Expense.countDocuments()
        const totalPages = Math.ceil(totalRecords / limit)

        const expenses = await Expense.aggregate([{ $project: { category: 1, amount: 1, date: 1, type: "expense" } }, { $sort: { date: -1 } }, { $skip: skip }, { $limit: limit }])
        if (!expenses) throw new ErrorHandler("No Expense exists", 400)

        return {
            success: true, message: "Expense data fetched successfully", data: expenses, pagination: {
                currentPage: page,
                limit,
                totalRecords,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        }
    },
    async update(payload: Partial<IExpensePayload>, expenseId: string) {

    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, { $set: payload }, { new: true })
    if (!updatedExpense) throw new ErrorHandler("Error while updating", 500)

    return { success: true, message: "Expense data updated successfully", data: updatedExpense }
},
    async delete (expenseId: string) {
    await Expense.findByIdAndDelete(expenseId)
    return { success: true, message: "Expense deleted successfully" }
}
}

export default expenseRepository
