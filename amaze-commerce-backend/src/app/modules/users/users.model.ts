import { model, Schema, Types } from "mongoose";
import { TUser } from "./users.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

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
        required: true,
        trim:true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default:"user",
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

userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.salt_rounds),
    )
    next();
})



export const User = model<TUser>('User', userSchema);