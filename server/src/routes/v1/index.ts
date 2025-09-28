import { Router } from "express";
import authRouter from "./auth"
import incomeRouter from "./income"
import expenseRouter from "./expense"
import authenticate from "../../middleware/auth.middleware"; 


const router = Router()

router.use("/auth", authRouter)

router.use(authenticate)

router.use("/income", incomeRouter)
router.use("/expense", expenseRouter)

export default router