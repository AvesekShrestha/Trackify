import { Router } from "express";
import gmailController from "../../../controllers/gmail.controller";

const router = Router()

router.post("/sendMail", gmailController.sendMail)
router.post("/callback", gmailController.handleCallback)

export default router