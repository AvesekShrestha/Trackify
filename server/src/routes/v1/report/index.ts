import { Router } from "express";
import reportController from "../../../controllers/report.controller";

const router = Router()

router.get("/recent" , reportController.recentTransaction)
router.get("/balance" , reportController.balanceReport)
router.get("/monthlyIncome" , reportController.monthlyIncomeReport)
router.get("/monthlyExpense" , reportController.monthlyExpenseReport)

export default router
