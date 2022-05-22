import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { findUserByEmail } from '../user/user.service';
import { LoginBody } from './auth.schema';
import omit from '../../helpers/omit';
import { jwtSign } from './auth.utils';

export const loginHandler = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send('Email or password is incorrect');
  }

  const payload = omit(user.toJSON(), ['password', '__v']);

  const token = jwtSign(payload);

  res.cookie('accessToken', token, {
    domain: process.env.FRONT_DOMAIN || 'localhost',
    httpOnly: true,
    path: '/',
    maxAge: 3.154e10, // 1 year
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return res.status(StatusCodes.OK).send({ token });
};
