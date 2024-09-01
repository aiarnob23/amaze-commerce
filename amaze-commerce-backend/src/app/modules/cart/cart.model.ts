import { model, Schema } from "mongoose";
import { TCart, TCartItem } from "./cart.interface";
import { number } from "zod";

const cartItemSchema = new Schema<TCartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const cartSchema = new Schema<TCart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0,
    },
    status: {
        type: String,
        enum: ["Paid", "Pending"],
        default: "Pending",
        required:false,
  }
});

cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.total, 0);
  next();
});

export const Cart = model<TCart>("Cart", cartSchema);
