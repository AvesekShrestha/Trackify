import { Router } from "express";
import authRouter from "./auth"
import incomeRouter from "./income"
import expenseRouter from "./expense"
import authenticate from "../../middleware/auth.middleware"; 
import oauthRouter from "./oauth"
import gmailRouter from "./gmail"
import reportRouter from "./report"
import userRouter from "./user"

const router = Router()

router.use("/auth", authRouter)

router.use(authenticate)

router.use("/user", userRouter)
router.use("/income", incomeRouter)
router.use("/expense", expenseRouter)
router.use("/oauth" , oauthRouter)
router.use("/gmail" , gmailRouter)
router.use("/report" , reportRouter)

export default router
