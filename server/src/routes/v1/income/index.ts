import { Router } from "express";
import incomeController from "../../../controllers/income.controller";

const router = Router()

router.post("/", incomeController.create)
router.get("/:id", incomeController.getById)
router.get("/", incomeController.getAll)
router.patch("/:id", incomeController.update)
router.delete("/:id", incomeController.delete)


export default router