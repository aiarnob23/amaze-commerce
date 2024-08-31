import { model, Schema } from "mongoose";
import { TUser } from "./users.interface";

const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        trim:true,
    },
    phone: {
        type: String,
        required: true,
        trim:true,
    },
    password: {
        type: String,
        required: false,
        trim:true,
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
    otp: {
        type: String,
        required: false,
        trim:true,
    }
})

export const User = model<TUser>('User', userSchema);