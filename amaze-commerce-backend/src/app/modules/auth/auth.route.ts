
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post('/login', validateRequest(authValidation.loginValidationSchema), authControllers.loginUser);

export const authRoutes = router;