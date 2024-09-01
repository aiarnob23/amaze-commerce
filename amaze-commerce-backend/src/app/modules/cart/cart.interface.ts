import { Document, Types } from "mongoose";

export interface TCartItem{
    product: Types.ObjectId;
    quantity: number;
    price: number;
    total: number;
}

export interface TCart extends Document{
    user: Types.ObjectId;
    items: TCartItem[];
    totalPrice: number;
    status: 'Pending' | 'Paid';
}