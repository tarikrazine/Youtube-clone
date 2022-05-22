import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'changeme';
const expires = process.env.EXPIRES || '1d';

export const jwtSign = (payload: string | object | Buffer) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: expires,
  });
};

export const jwtVerify = (token: string) => {
  try {
    const decode = jwt.verify(token, secretKey);

    return decode;
  } catch (e: any) {
    return null;
  }
};
