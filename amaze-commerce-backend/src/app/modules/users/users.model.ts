import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./users.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>({
    name: {
        type: String,
        required: true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    phone: {
        type: String,
        required: true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select:false,
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
//hashing password 
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.salt_rounds),
    )
    next();
})
//checking existance of user and checking password
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};


export const User = model<TUser, UserModel>('User', userSchema);