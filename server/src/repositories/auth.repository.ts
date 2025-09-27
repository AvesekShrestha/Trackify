import { IRegisterPayload, ILoginPayload } from "../types/user.types"
import User from "../models/user.model"
import ErrorHandler from "../utils/errorHandler"

const authRepository = {

    async register(payload : IRegisterPayload){

        const userExists = await User.findOne({email : payload.email})
        if(userExists) throw new ErrorHandler("User already Exists" , 400)
        
        const user = new User({...payload})
        const newUser = user.save()

        return newUser
    }
}

export default authRepository