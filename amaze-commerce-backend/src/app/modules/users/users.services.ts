
import { TUser } from "./users.interface";
import { User } from "./users.model";



//create new user
const createNewUser = async (userData: TUser) => {
    const result = await User.create(userData);
    return result;
}
//get user by id
const getUser = async (id: any) => {
    const result = await User.findById(id);
    return result;
}
//find a user by email
const getUserByEmail = async (email: string) => {
    const result = await User.findOne({ email: email });
    return result;
}
//update users OTP
const updateUsersOTP = async (id:any, OTP: string) => {
    const result = await User.findByIdAndUpdate(id, { otp: OTP },{new:true});
    return result;
}
//get users OTP
const getUserOTPfromDB = async (email: string) => {
    const result = await User.findOne({email:email}, { otp: 1 });
    return result;
}
//update users isVerified state
const updateUsersIsVerifiedState = async (email: string) => {
    const result = await User.findOneAndUpdate({email:email}, { isVerified: true, otp:'' }, { new: true });
    return result;
}

export const userServices = {
    createNewUser,
    getUser,
    getUserByEmail,
    updateUsersOTP,
    getUserOTPfromDB,
    updateUsersIsVerifiedState,
}