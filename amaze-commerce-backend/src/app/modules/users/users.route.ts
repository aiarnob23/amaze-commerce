import express from "express";
import { userControllers } from "./users.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { zodUserValidationSchema } from "./users.validation";
const router = express.Router();

router.post('/create-user', validateRequest(zodUserValidationSchema.newUserValidation), userControllers.createNewUser);
router.get(`/:id`, userControllers.getUser);
router.patch(`/resend-otp/:id`, userControllers.resendOTPtoUser);
router.get(`/check-otp/:id`, userControllers.checkUsersOTP);


export const UsersRoutes = router;