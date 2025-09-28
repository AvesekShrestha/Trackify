import { Router } from "express";
import expenseController from "../../../controllers/expense.controller";

const router = Router()

router.post("/", expenseController.create)
router.get("/:id", expenseController.getById)
router.get("/", expenseController.getAll)
router.patch("/:id", expenseController.update)
router.delete("/:id", expenseController.delete)


export default router