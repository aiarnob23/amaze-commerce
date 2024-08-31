export type TUser = {
    email: string,
    name: string,
    phone: string,
    password?: string,
    isVerified: boolean,
    otp: string,
}