import { Router } from "express";
import { AuthController } from "../controller";
import { checkToken } from "../middleware";

const router = Router();
//Login route
router.post("/login", AuthController.login);
//Change my password
router.post("/change-password", [checkToken], AuthController.changePassword);

export default router;
