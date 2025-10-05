import { Router } from "express";
import reportController from "../../../controllers/report.controller";

const router = Router()

router.get("/recent" , reportController.recentTransaction)
router.get("/balance" , reportController.availableBalance)

export default router