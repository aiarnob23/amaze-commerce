import nodemailer, { Transporter } from "nodemailer";



export const sendEmail =async(userEmail:string, OTP:string) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: userEmail, // list of receivers
      subject: "Your OTP code", // Subject line
      text: `Your otp code is ${OTP}. Thanks for finding us.`, // plain text body
    });
}