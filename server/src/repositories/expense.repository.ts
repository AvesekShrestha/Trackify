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

        return expense
    },
    async getById(expenseId: string) {

        const expense = await Expense.findById(expenseId)
        if (!expense) throw new ErrorHandler("No such expense", 400)

        return expense
    },
    async getAll() {

        const expenses = await Expense.aggregate([{$project : {category : 1 , amount : 1 , date : 1, type: "expense"}}])
        if (!expenses || expenses.length == 0) throw new ErrorHandler("No Expense exists", 400)

        return expenses
    },
    async update(payload: Partial<IExpensePayload>, expenseId: string) {

        const updatedExpense = await Expense.findByIdAndUpdate(expenseId , {$set : payload}, {new : true})
        if (!updatedExpense) throw new ErrorHandler("Error while updating", 500)

        return updatedExpense
    },
    async delete(expenseId : string){
        await Expense.findByIdAndDelete(expenseId)
    }

}

export default expenseRepository
