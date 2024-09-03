import express from "express";
import { cartControllers } from "./cart.controller";
import { verifyToken } from "../../middlewares/auth";

const router = express.Router();

router.post(`/add-to-cart/:id`,verifyToken, cartControllers.addProductToCart);
router.get(`/get-user-cart/:id`, verifyToken, cartControllers.getUsersCart);

export const cartRoutes = router;