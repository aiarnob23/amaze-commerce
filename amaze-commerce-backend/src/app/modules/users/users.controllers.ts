import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { generateOTP } from "../../utils/generateOTP";
import { sendEmail } from "../../utils/sendEmail";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./users.services";

//create new user
const createNewUser = catchAsync(async (req, res) => {
    const userData = req.body;
    const resultUser = await userServices.createNewUser(userData);
    if (resultUser._id) {
        const OTP = generateOTP(6);
        const result = await userServices.updateUsersOTP(resultUser?._id, OTP);
        if (result?.otp) {
            sendEmail(result.email, result.otp);
        }
    }
})

//resend otp
const resendOTPtoUser = catchAsync(async (req, res) => {
    const id = req?.params?.id;
    const OTP = generateOTP(6);
    const result = await userServices.updateUsersOTP(id, OTP);
    if (result?.otp) {
        sendEmail(result.email, result.otp);
    }
})

//get users otp from db
const checkUsersOTP= catchAsync(async (req, res) => {
    const id = req?.params?.id;
    const payload = req?.body?.otp;
    const result = await userServices.getUserOTPfromDB(id);
    const OTP = result?.otp;
    console.log(payload, ' ', OTP);
    if (payload === OTP) {
        const result = await userServices.updateUsersIsVerifiedState(id);
        sendResponse(res, {
            success: true, 
            statusCode: httpStatus.OK,
            message: 'User verified successfully',
            data: result,
        })
    }
    else {
        sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_ACCEPTABLE,
            message: 'Something wrong please try again with actual OTP',
            data:'',
        })
    }
})



export const userControllers = {
  createNewUser,
    checkUsersOTP,
  resendOTPtoUser,
};