import { ZodError } from "zod"
import ErrorHandler from "../utils/errorHandler"
import { IExpensePayload, ZodExpense , ZodExpenseUpdate } from "../types/expense.types"
import expenseRepository from "../repositories/expense.repository"

const expenseService = {

    create(payload: IExpensePayload, userId: string) {
        try {

            if (!userId || !payload) throw new ErrorHandler("Both userId and payload required", 400)
            ZodExpense.parse(payload)

            return expenseRepository.create(payload , userId)
        } catch (error: any) {
            if (error instanceof ZodError) throw new ErrorHandler(error.issues[0].message, 400)
            throw new ErrorHandler(error.message, 500)
        }
    },
    getById(expenseId: string) {

        if (!expenseId) throw new ErrorHandler("Expense Id required", 400)

        return expenseRepository.getById(expenseId)
    },
    getAll() {
        return expenseRepository.getAll()
    },
    update(payload: Partial<IExpensePayload>, expenseId: string) {

        if (!payload || !expenseId) throw new ErrorHandler("Both payload and expense id require", 400)

        try {
            ZodExpenseUpdate.parse(payload)
            return expenseRepository.update(payload, expenseId)
        } catch (error: any) {
            if (error instanceof ZodError) throw new ErrorHandler(error.issues[0].message, 400)
            throw new ErrorHandler(error.message, 500)
        }
    },
    delete(expenseId: string) {

        if (!expenseId) throw new ErrorHandler("Expense id required", 400)
        return expenseRepository.delete(expenseId)
    }

}

export default expenseService