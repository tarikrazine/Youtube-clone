import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../modules/auth/auth.utils';

export default function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = (
    req.cookies.accessToken ||
    req.headers.authorization ||
    ''
  ).replace(/^Bearer\s/, '');

  if (!accessToken) {
    return next();
  }

  const decode = jwtVerify(accessToken);

  if (decode) {
    res.locals.user = decode;
  }

  return next();
}
