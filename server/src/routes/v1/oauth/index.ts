import { Router } from "express";
import oauthController from "../../../controllers/oauth.controller";

const router = Router()

router.get("/", oauthController.getOAuthUrl)
router.get("/callback", oauthController.handleOAuthCallback)

export default router
