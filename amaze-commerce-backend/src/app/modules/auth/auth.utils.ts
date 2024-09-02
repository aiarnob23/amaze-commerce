import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { userEmail: String; role: String },
  secret: string,
  expiresIn: string
) => {
  let token = jwt.sign(jwtPayload, secret, { expiresIn });
  return `${token}`;
};


export const verifyToken = (token: string, secret: any) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  }
  catch (error) {
    throw new Error('Invalid or expired token');
  }
}