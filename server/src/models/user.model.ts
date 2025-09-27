import mongoose from "mongoose";
import { IUser } from "../types/user.types";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { jwtSecret } from "../config/constant";
import ErrorHandler from "../utils/errorHandler";

const userSchema = new mongoose.Schema<IUser>({
    username : {
        type : String, 
        required : true,
        minLength : [1, "Username should be atleast 1 character"]
    },
    email : {
        type : String, 
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
})

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next()
    
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)

    next()
})

userSchema.methods.comparePassword = async function(candidatePassword : string) : Promise<boolean> {
    return bcrypt.compare(candidatePassword , this.password)
}

userSchema.methods.generateAccessToken = async function() : Promise<string> {
    if(!jwtSecret) throw new ErrorHandler("JWT secret is not present in .env" , 400)
    return jwt.sign({_id : this._id , username : this.username, email : this.email}, jwtSecret , {expiresIn : "15m"})
}

userSchema.methods.generateRefreshToken = async function() : Promise<string> {
    if(!jwtSecret) throw new ErrorHandler("JWT secret is not present in .env" , 400)
    return jwt.sign(this._id, jwtSecret , {expiresIn : "15m"})
}

const User = mongoose.model<IUser>("user" , userSchema)

export default User
