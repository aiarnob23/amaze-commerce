
import { SERVER_BASE_URL } from "../config";
import { catchAsync } from "../utils";

//register user
export const registerUser = catchAsync(async (name, email: string, phone: string, password: string) => {
    const user = { name, email, phone, password };
    const res = await fetch(`${SERVER_BASE_URL}/user/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      cache:'no-store',
    });
  const data = await res.json();
  if (data.success) {
      return {
        data,
      }
    }
   }
);

//email verfy via OTP
export const verifyEmail = catchAsync(async (OTP: string, email: string) => {
  const res = await fetch(`${SERVER_BASE_URL}/user/check-otp/${email}?OTP=${OTP}`)
  const data = await res.json();
  if (data.success) {
    window.location.href = "/";
  }
})


//login user
export const loginUser = catchAsync(async (email: string, password: string) => {
  const user = { email, password };
  console.log(user);
  const res = await fetch(`${SERVER_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials:'include',
    cache:'no-store',
  });
  const data = await res.json();
  console.log(data);
  return {
    data,
  }
})