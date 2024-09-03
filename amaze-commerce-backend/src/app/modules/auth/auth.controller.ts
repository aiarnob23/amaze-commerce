import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { createToken } from "./auth.utils";
import config from "../../config";
import { userServices } from "../users/users.services";
import jwt from "jsonwebtoken";

//login user
const loginUser = catchAsync(async (req, res) => {
  const { userData, refreshToken, accessToken } = await AuthServices.loginUser(
    req.body
  );
  const { password, ...result } = (userData as any)._doc;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 12 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login is successfull",
    data: { result ,accessToken},
  });
})



//generate new Access Token
const newAccessToken = catchAsync(async (req, res) => {
    const refreshToken =  req?.cookies?.refreshToken || null;
  const decoded: any = jwt.verify(refreshToken, config.secret as string);
    if (!decoded) {
        sendResponse(res, {
            success: false,
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'You are not authenticated',
            data:null,
        })
    }

    const accessToken = createToken({
        userEmail: decoded.userEmail,
        role:decoded.role,
    },
        config.secret as string,
        "12d"
    )

    const result = await userServices.getUserByEmail(decoded.userEmail);
    if (accessToken && result) {
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'new access token generated successfully',
            data:{result, accessToken},
        })
    }
})


export const authControllers = {
    loginUser,
    newAccessToken,
}