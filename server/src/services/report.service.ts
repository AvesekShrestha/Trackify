import reportRepository from "../repositories/report.repository"
import ErrorHandler from "../utils/errorHandler"

const reportService = {
    recentTransaction(userId : string){
        if(!userId) throw new ErrorHandler("UserId required" , 400)
        return reportRepository.recentTransaction(userId)
    },
    availableBalance(userId : string){
        if(!userId) throw new ErrorHandler("UserId required" , 400)
        return reportRepository.availableBalance(userId)
    }
}

export default reportService