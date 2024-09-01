import { Types } from "mongoose";
import { Cart } from "./cart.model";


//add item to cart
const addToCart = async (userId: Types.ObjectId, productId: Types.ObjectId, quantity: number, price: number, total:number)=>{
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
        cart.items.push({ product: productId, quantity: quantity, price, total });
    }
    else {
        cart = new Cart({
            user: userId,
            items: [{ product: productId, quantity, price, total }],
        })
    }
    const result = await cart.save();
    return result;
}
//delete an item from cart
const deleteItemFromCart = async (userId: Types.ObjectId, productId: Types.ObjectId) => {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
        cart.items = cart.items.filter(
          (item) => !item.product.equals(productId)
        );
        const result = await cart.save();
        return result;
    }
    else {
        throw new Error("Cart not found for the user");
    }
}
//update payment status
const updatePaymentStatus = async (userId: Types.ObjectId) => {
    const result = await Cart.findOneAndUpdate({ user: userId }, { status: "Paid" });
    return result;
}
 
export const cartServices = {
    addToCart,
    deleteItemFromCart,
    updatePaymentStatus,
}