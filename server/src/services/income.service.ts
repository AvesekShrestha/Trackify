import { ZodError } from "zod"
import { IIncomePayload, ZodIncome, ZodIncomeUpdate } from "../types/income.types"
import ErrorHandler from "../utils/errorHandler"
import incomeRepository from "../repositories/income.repository"

const incomeService = {

    create(payload: IIncomePayload, userId: string) {
        try {

            if (!userId || !payload) throw new ErrorHandler("Both userId and payload required", 400)
            ZodIncome.parse(payload)

            return incomeRepository.create(payload, userId)
        } catch (error: any) {
            if (error instanceof ZodError) throw new ErrorHandler(error.issues[0].message, 400)
            throw new ErrorHandler(error.message, 500)
        }
    },
    getById(incomeId: string) {

        if (!incomeId) throw new ErrorHandler("Income Id required", 400)

        return incomeRepository.getById(incomeId)
    },
    getAll(page: number, limit : number) {
        
        if(page <= 0) page = 1
        if(limit <= 0) limit = 8
        return incomeRepository.getAll(page , limit)
    },
    update(payload: Partial<IIncomePayload>, incomeId: string) {

        if (!payload || !incomeId) throw new ErrorHandler("Both payload and income id require", 400)

        try {
            ZodIncomeUpdate.parse(payload)
            return incomeRepository.update(payload, incomeId)
        } catch (error: any) {
            if (error instanceof ZodError) throw new ErrorHandler(error.issues[0].message, 400)
            throw new ErrorHandler(error.message, 500)
        }
    },
    delete(incomeId: string) {

        if (!incomeId) throw new ErrorHandler("Income id required", 400)
        return incomeRepository.delete(incomeId)
    }

}

export default incomeService
