import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { userServices } from "../users/users.services";
import { cartServices } from "../cart/cart.service";

//login user
const loginUser = catchAsync(async (req, res) => {
  const { userData, accessToken } = await AuthServices.loginUser(
    req.body
  );
  const { password, ...result } = (userData as any)._doc;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login is successfull",
    data: { result, accessToken },
  });
});


//get all cart orders
const getOrders = catchAsync(async (req, res) => {
  const result = await cartServices.getCartOrders();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart orders fetched successfully.",
    data: result,
  });
});

//get all users
const getAllUsers = catchAsync(async (req, res) => {
  console.log('controller req received');
  const result = await userServices.getAllUser();
  console.log('controller res: ', result);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users data fetched successfully",
    data:result,
  })
})

export const authControllers = {
  loginUser,
  getOrders,
  getAllUsers,
};
