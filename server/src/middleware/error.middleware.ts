import { Request , Response , NextFunction } from "express"

const errorMiddleware = (error : any, req : Request , res : Response , next : NextFunction)=>{
    error.message = error.message || "Internal Server Error"
    error.statusCode = error.statusCode || 500

    res.status(error.statusCode).json({
        success : false,
        message : error.message
    })

}

export default errorMiddleware
