import User from "../models/user.model"
import { IUser } from "../types/user.types"
import ErrorHandler from "../utils/errorHandler"

const userRepository = {

    async getById(userId: string) {

        const user = await User.findById(userId)
        if (!user) throw new ErrorHandler("No such user", 400)
        return user
    },
    async getByConnectedEmail(email : string){
        const user = await User.findOne({"gmail.connectedEmail" : email})
        return user
    },
    async getByEmail(email : string){
        const user = await User.findOne({email})
        return user
    },
    async update(userId : string, payload : Partial<IUser>){
        const updatedUser = await User.findByIdAndUpdate(userId, {$set : payload} , {new : true})
        return updatedUser
    },
    async updateHistoryId(userId : string , historyId : string){

        const user = await this.getById(userId)
        user.gmail.historyId = historyId
        await user.save()

        return user
    }
}


export default userRepository
