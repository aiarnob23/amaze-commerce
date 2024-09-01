import config from "../../config";
import { User } from "../users/users.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";

//login user 
const loginUser = async (payload: TLoginUser) => {
    //checking if user is exists
    const userData = await User.isUserExistsByEmail(payload.email);

    if (!userData) {
        throw new Error('This user is not found!');
    }

    //checking if the password is correct
    if (!(await User.isPasswordMatched(payload?.password, userData?.password))) {
        throw new Error('Incorrect password')
    }
   
    //create token and send to the client
    const jwtPayload = {
        userEmail: userData.email,
        role:userData.role,
    }

      const accessToken = createToken(
        jwtPayload,
        config.secret as string,
        "7d",
    );
    
    const refreshToken = createToken(
      jwtPayload,
      config.secret as string,
      "7d",
    );


    return {
        refreshToken,
        userData:userData,
    }
}





export const AuthServices = {
    loginUser,
}