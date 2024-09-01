

export type TUser = {
    email: string,
    name: string,
    phone: string,
    role:'admin'|'user',
    password: string,
    isVerified: boolean,
    otp: string,
}