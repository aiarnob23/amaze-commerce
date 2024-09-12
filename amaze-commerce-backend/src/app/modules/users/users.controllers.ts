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
  console.log('user created successfully: ', resultUser);
  if (resultUser._id) {
    const OTP = generateOTP(6);
    const result = await userServices.updateUsersOTP(resultUser?._id, OTP);
    if (result?.otp) {
      sendEmail(result.email, result.otp);
      sendResponse(res, {
        success: true, 
        statusCode: httpStatus.OK,
        message: 'Please verify your email',
        data:resultUser,
      })
    }
  }
});

//get user
const getUser = catchAsync(async (req, res) => {
  const result = await userServices.getUser(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User fetched successfully',
    data:result,
  })
});

//resend otp
const resendOTPtoUser = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const OTP = generateOTP(6);
  const result = await userServices.updateUsersOTP(id, OTP);
  if (result?.otp) {
    sendEmail(result.email, result.otp);
  }
});

//check users otp and verify users email
const checkUsersOTP = catchAsync(async (req, res) => {
  const email = req?.params?.email;
  const payload = req?.query?.OTP;
  const result = await userServices.getUserOTPfromDB(email);
  const OTP = result?.otp;
  if (payload === OTP) {
    const result = await userServices.updateUsersIsVerifiedState(email);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User verified successfully",
      data: result,
    });
  } else {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_ACCEPTABLE,
      message: "Something wrong please try again with actual OTP",
      data: "",
    });
  }
});

//make admin 
const updateRoleToAdmin = catchAsync(async (req, res) => {
  console.log('controller req rcvd');
  const id = req?.params?.id;
  console.log(id);
  const result = await userServices.updateRoleToAdmin(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message:"User promoted to Admin",
    data:result,
  })
});


export const userControllers = {
  createNewUser,
  getUser,
  checkUsersOTP,
  resendOTPtoUser,
  updateRoleToAdmin,
};
