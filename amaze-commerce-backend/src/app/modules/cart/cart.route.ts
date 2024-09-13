import express from "express";
import { cartControllers } from "./cart.controller";


const router = express.Router();

router.post(`/add-to-cart/:id`, cartControllers.addProductToCart);
router.get(`/get-user-cart/:id`, cartControllers.getUsersCart);
router.patch(`/delete-item/:id`, cartControllers.deleteItemFromCart);

export const cartRoutes = router;