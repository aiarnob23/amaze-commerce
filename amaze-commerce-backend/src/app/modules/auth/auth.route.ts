
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authControllers } from "./auth.controller";
import { verifyAdmin } from "../../middlewares/auth";

const router = express.Router();

router.post('/login', validateRequest(authValidation.loginValidationSchema), authControllers.loginUser);
router.get('/cart-orders',verifyAdmin, authControllers.getOrders);
router.get('/all-users',verifyAdmin, authControllers.getAllUsers);

export const authRoutes = router;