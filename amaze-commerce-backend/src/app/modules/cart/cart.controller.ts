import catchAsync from "../../utils/catchAsync";
import { productsServices } from "../products/products.service";


const addProductToCart = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const payload = req.body;
    const productId = payload.productId;
    const quantity = payload.quantity;
    const productDetails = await productsServices.getSingleProduct(productId);
    const { price } = productDetails;
    const total = price * quantity;

})

export const cartControllers = {
    addProductToCart,
}