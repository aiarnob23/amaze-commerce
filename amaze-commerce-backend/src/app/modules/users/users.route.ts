import express from "express";
import { userControllers } from "./users.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { zodUserValidationSchema } from "./users.validation";
import { verifyAdmin } from "../../middlewares/auth";
const router = express.Router();

router.post('/create-user', validateRequest(zodUserValidationSchema.newUserValidation), userControllers.createNewUser);
router.get(`/:id`, userControllers.getUser);
router.patch(`/resend-otp/:id`, userControllers.resendOTPtoUser);
router.get(`/check-otp/:email`, userControllers.checkUsersOTP);
router.patch(`/make-admin/:id`, userControllers.updateRoleToAdmin);


export const UsersRoutes = router;