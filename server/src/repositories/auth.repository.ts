import { IRegisterPayload, ILoginPayload, IUser } from "../types/user.types"
import User from "../models/user.model"
import ErrorHandler from "../utils/errorHandler"

const authRepository = {

    async register(payload : IRegisterPayload){

        const userExists = await User.findOne({email : payload.email})
        if(userExists) throw new ErrorHandler("User already Exists" , 400)
        
        const user = new User({...payload})
        const newUser = user.save()

        return newUser
    },
    async login(payload : ILoginPayload){
        
        const user = await User.findOne({email : payload.email})
        if(!user) throw new ErrorHandler("Such user doesnot exists" , 400)

        const passwordMatch = await user.comparePassword(payload.password)
        if(!passwordMatch) throw new ErrorHandler("Password doesnot match" , 400)
        
        return user
    },
    async refresh(_id : string){
        
        const user = await User.findById(_id)
        if(!user) throw new ErrorHandler("Invalid refresh token" , 401)
            
        return user

    } 

}

export default authRepository