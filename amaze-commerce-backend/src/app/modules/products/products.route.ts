import express from "express";
import { productsControllers } from "./products.controller";

const router = express.Router();

router.get('/', productsControllers.getProducts);
router.get(`/single/:id`, productsControllers.getProductById);
router.post('/', productsControllers.addNewProduct);

export const ProductsRoutes = router;