import {z} from "zod"

interface IUser{
    username? : string
    email : string
    password : string
}

const loginSchema = z.object({
    email : z.string().email("Invalid email address").trim().min(1, "Email required"),
    password : z.string().trim().min(8, "Password should be atleast 8 length character")
})

export {loginSchema , IUser}

