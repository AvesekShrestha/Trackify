import reportRepository from "../repositories/report.repository"
import ErrorHandler from "../utils/errorHandler"

const reportService = {
    recentTransaction(userId : string){
        if(!userId) throw new ErrorHandler("UserId required" , 400)
        return reportRepository.recentTransaction(userId)
    },
    balanceReport(userId : string){
        if(!userId) throw new ErrorHandler("UserId required" , 400)
        return reportRepository.balanceReport(userId)
    },
    monthlyIncomeReport(userId : string){
        if(!userId) throw new ErrorHandler("UserId required" , 400)
        return reportRepository.monthlyIncomeReport(userId) 
    },
    monthlyExpenseReport(userId : string){
        if(!userId) throw new ErrorHandler("UserId required" , 400)
        return reportRepository.monthlyExpenseReport(userId)
    }
}

export default reportService
