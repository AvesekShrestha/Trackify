import { IUser } from "../types/user.types"
import ErrorHandler from "../utils/errorHandler"
import userRepository from "../repositories/user.repository"

const userService = {

    getById(userId: string) {

        if (!userId) throw new ErrorHandler("User Id required", 400)
        return userRepository.getById(userId)
    },
    getByConnectedEmail(email: string) {
        if (!email) throw new ErrorHandler("Email Address required", 400)
        return userRepository.getByConnectedEmail(email)
    },
    getByEmail(email: string) {
        if (!email) throw new ErrorHandler("Email Address required", 400)
        return userRepository.getByEmail(email)
    },
    update(userId: string, payload: Partial<IUser>) {

        if (!userId) throw new ErrorHandler("User Id required", 400)
        return userRepository.update(userId, payload)
    },
    updateHistoryId(userId: string, historyId: string) {
        return userRepository.updateHistoryId(userId, historyId)
    },

}

export default userService