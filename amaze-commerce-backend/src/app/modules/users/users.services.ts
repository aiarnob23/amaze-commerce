
import { TUser } from "./users.interface";
import { User } from "./users.model";



//create new user
const createNewUser = async (userData: TUser) => {
    const result = await User.create(userData);
    return result;
}
//update users OTP
const updateUsersOTP = async (id:any, OTP: string) => {
    const result = await User.findByIdAndUpdate(id, { otp: OTP },{new:true});
    return result;
}

//get users OTP
const getUserOTPfromDB = async (id: any) => {
    const result = await User.findById(id, { otp: 1 });
    return result;
}

//update users isVerified state
const updateUsersIsVerifiedState = async (id: any) => {
    const result = await User.findByIdAndUpdate(id, { isVerified: true, otp:'' }, { new: true });
    return result;
}

export const userServices = {
    createNewUser,
    updateUsersOTP,
    getUserOTPfromDB,
    updateUsersIsVerifiedState,
}