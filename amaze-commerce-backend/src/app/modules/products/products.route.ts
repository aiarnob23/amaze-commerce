import express from "express";
import { productsControllers } from "./products.controller";

const router = express.Router();

router.get('/', productsControllers.getProducts);
router.patch(`/update-product/:id`, productsControllers.updateProduct);
router.get(`/single/:id`, productsControllers.getProductById);
router.post('/', productsControllers.addNewProduct);
router.delete(`/delete/:id`, productsControllers.deleteProduct);


export const ProductsRoutes = router;