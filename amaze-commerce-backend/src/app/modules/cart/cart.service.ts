import { Types } from "mongoose";
import { Cart } from "./cart.model";


//add to product to cart
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

 
export const cartServices = {
    addToCart,
}