import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productsServices } from "../products/products.service";
import { cartServices } from "./cart.service";

//add item to the cart
const addProductToCart = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const payload = req.body;
    const productId = payload.productId;
    const title = payload.title;
    const displayImage = payload.displayImage;
    const quantity = payload.quantity;
    const productDetails = await productsServices.getSingleProduct(productId);
    const { price } = productDetails;
    const total = price * quantity;
    console.log(payload);
    const result = await cartServices.addToCart(userId, productId,title,displayImage, quantity, price, total)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Product added to cart',
        data:result,
    })
})
//get user based cart 
const getUsersCart = catchAsync(async (req, res) => {
    const result = await cartServices.getUsersCart(req?.params?.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'user cart data',
        data:result,
    })
})
//delete users item from cart
const deleteItemFromCart = catchAsync(async (req, res) => {
    console.log(req.params.id, req.body);
    const result = await cartServices.deleteItemFromCart(req?.params?.id, req?.body?.productId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Item deleted from cart',
        data:result,
    })
})
export const cartControllers = {
    addProductToCart,
    getUsersCart,
    deleteItemFromCart,
}