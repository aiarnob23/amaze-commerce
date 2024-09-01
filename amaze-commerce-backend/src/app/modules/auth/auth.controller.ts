import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";


const loginUser = catchAsync(async (req, res) => {
    const { userData, refreshToken } = await AuthServices.loginUser(req.body);
    const { password, ...result } = (userData as any)._doc;
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Login is successfull',
        data: {result, refreshToken},
    })
})



export const authControllers = {
    loginUser,
}