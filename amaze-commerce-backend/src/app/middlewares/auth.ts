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
    const user = await userServices.getUser(req?.params?.id);
    const email = user?.email || null;
    
    if (!token || !user || !email) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access",
            redirectTo:'/auth/login',
        })
    }
    if (!user.isVerified) {
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
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Forbidden access",
            redirectTo:'/auth/login',
        })
    }
}