import { ILoginPayload, IRegisterPayload, ZodUser } from "../types/user.types";
import { ZodError } from "zod";
import ErrorHandler from "../utils/errorHandler";
import authRepository from "../repositories/auth.repository";
import jwt from "jsonwebtoken"
import { secret } from "../config/constant";

const authService = {

    register(payload: IRegisterPayload) {
        try {
            ZodUser.parse(payload)
            return authRepository.register(payload)

        } catch (error: any) {
            if (error instanceof ZodError) throw new ErrorHandler(error.issues[0].message, 400)
            throw new ErrorHandler(error.message, 400)
        }
    },
    async login(payload: ILoginPayload) {
        try {
            ZodUser.parse(payload)
            const user = await authRepository.login(payload)

            const accessToken = user.generateAccessToken()
            const refreshToken = user.generateRefreshToken()

            return {accessToken, refreshToken}

        } catch (error: any) {
            if (error instanceof ZodError) throw new ErrorHandler(error.issues[0].message, 400)
            throw new ErrorHandler(error.message, 400)
        }
    },
    async refresh(refreshToken : string){
        
        if(!refreshToken) throw new ErrorHandler("Refresh Token requied", 401)
        if(!secret) throw new ErrorHandler("JWT secret is not present in .env file", 400)
        
        const payload = jwt.verify(refreshToken, secret) as {_id : string}

        const user = await authRepository.refresh(payload._id)

        const accessToken = user.generateAccessToken()
        
        return accessToken
    }
}

export default authService