import z from "zod"
import { Document } from "mongoose"

const ZodUser = z.object({
    username : z.string().trim().min(1, {message : "Username must be atleast 1 character"}).optional(),
    email : z.email({message : "Invalid email address"}),
    password : z.string().trim().min(8 , { message : "password mustbe great than 8 characters"})
})

interface IUser extends Document{
    username : string
    email : string
    password : string 
    comparePassword(candidatePassword : string) : Promise<boolean>
    generateAccessToken() : string
    generateRefreshToken() : string
}

interface IRegisterPayload{
    username : string
    email : string
    password : string   
}

interface ILoginPayload {
    email : string
    password : string
}

export {IUser , IRegisterPayload , ILoginPayload , ZodUser}
