import { Model } from "mongoose";


export type TUser = {
    email: string,
    name: string,
    phone: string,
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
