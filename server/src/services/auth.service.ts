import { IRegisterPayload, ZodUser } from "../types/user.types";
import { ZodError } from "zod";
import ErrorHandler from "../utils/errorHandler";
import authRepository from "../repositories/auth.repository";

const authService = {

    register(payload: IRegisterPayload) {
        try {
            ZodUser.parse(payload)
            return authRepository.register(payload)

        } catch (error: any) {
            if (error instanceof ZodError) throw new ErrorHandler(error.issues[0].message, 400)
            throw new ErrorHandler(error.message , 400)
        }
    }
}

export default authService