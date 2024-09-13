
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post('/login', validateRequest(authValidation.loginValidationSchema), authControllers.loginUser);
router.get('/access-token', authControllers.newAccessToken);
router.get('/cart-orders', authControllers.getOrders);
router.get('/all-users', authControllers.getAllUsers);

export const authRoutes = router;