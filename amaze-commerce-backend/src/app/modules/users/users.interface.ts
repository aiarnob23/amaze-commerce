import { Model } from "mongoose";


export type TUser = {
    email: string,
    name: string,
    phone: string,
    shippingAddress:string,
    city:string,
    country:string,
    postalCode:number,
    role:'admin'|'user',
    password: string,
    isVerified: boolean,
    otp: string,
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
