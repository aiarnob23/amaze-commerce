import { NextFunction, Request, Response } from "express";
import { userServices } from "../modules/users/users.services";
import jwt from "jsonwebtoken";
import config from "../config";

export const verifyToken = async(
    req: Request,
    res: Response,
    next:NextFunction,
) => {
    const token = req?.cookies?.refreshToken || null;
    console.log(token);
    const user = await userServices.getUser(req?.params?.id);
    const email = user?.email || null;

    console.log(token, email, user);
    
    if (!token || !user || !email) {
        console.log('no token');
        return res.status(401).json({
            success: false,
            message: "Unauthorized access",
            redirectTo:'/auth/login',
        })
    }
    if (!user.isVerified) {
        console.log('no verified');
         return res.status(401).json({
           success: false,
           message: "Email not verified",
           redirectTo: "/auth/otp",
         });
    }
    try {
        const decoded = jwt.verify(
            token,
            config.secret as string
        ) as jwt.JwtPayload;
        console.log(decoded);
        console.log(decoded?.userEmail,' ', email);
        if (decoded?.userEmail == email) {
            console.log('added to cart after checking user');
            next();
        }
    }
    catch (error) {
        console.log('not authorized ');
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Forbidden access",
            redirectTo:'/auth/login',
        })
    }
}


export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req?.cookies?.refreshToken || null;


  if (!token ) {
    console.log("no token");
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
      redirectTo: "/auth/login",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.secret as string
    ) as jwt.JwtPayload;
    console.log(decoded);
   
      if (decoded?.role == 'admin') {
      console.log('admin verification okay');
      next();
    }
  } catch (error) {
    console.log("not authorized ");
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Forbidden access",
      redirectTo: "/auth/login",
    });
  }
};
