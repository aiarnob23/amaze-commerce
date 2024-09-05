import { Types } from "mongoose";
import { Cart } from "./cart.model";


//add item to cart
const addToCart = async (userId: any, productId: any,title:string,displayImage:string, quantity: number, price: number, total:number)=>{
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
        cart.items.push({ product: productId,title,displayImage, quantity: quantity, price, total });
    }
    else {
        cart = new Cart({
            user: userId,
            items: [{ product: productId,title,displayImage, quantity, price, total }],
        })
    }
    const result = await cart.save();
    return result;
}

const getUsersCart = async (userId: any) => {
    const result = await Cart.findOne({ user: userId });
    return result;
}
//delete an item from cart
const deleteItemFromCart = async (userId: any, productId: any) => {
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
  getUsersCart,
};