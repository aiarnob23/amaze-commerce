import { SERVER_BASE_URL } from "../config";
import { catchAsync } from "../utils/catchAsync";
import { errorAlert } from "../utils/sweetAlerts";

//register user
export const registerUser = catchAsync(
  async (name, email: string, phone: string, password: string) => {
    const user = { name, email, phone, password };
    const res = await fetch(`${SERVER_BASE_URL}/user/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      cache: "no-store",
    });
    const data = await res.json();
    if (data.success) {
      return {
        data,
      };
    }
  }
);

//email verfy via OTP
export const verifyEmail = catchAsync(async (OTP: string, email: string) => {
  const res = await fetch(
    `${SERVER_BASE_URL}/user/check-otp/${email}?OTP=${OTP}`
  );
  const data = await res.json();
  if (data.success) {
     window.location.href = "/auth/login";
  } else {
    errorAlert("Wrong OTP! . Please try again or request for a new OTP.");
  }
});
//resend OTP
export const resendOTP = catchAsync(async (id: any) => {
  const res = await fetch(`${SERVER_BASE_URL}/user/resend-otp/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
});

//login user
export const loginUser = catchAsync(async (email: string, password: string) => {
  try {
    const user = { email, password };
    const res = await fetch(`${SERVER_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
      cache: "no-store",
    });
    const data = await res.json();
    console.log(data);
    return {
      data,
    };
  } catch (error) {
    return { error };
  }
});

//get local storage user
export const getLocalUser = catchAsync(async () => {
  const user: any = localStorage.getItem("user");
  const res = JSON.parse(user);
  return res;
});

//get user
export const getUser = catchAsync(async (id: any) => {
  const res = await fetch(`${SERVER_BASE_URL}/user/${id}`);

  const data = await res.json();
  console.log(data);
  return {
    data,
  };
});
