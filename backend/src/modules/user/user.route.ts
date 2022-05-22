import express, { Request, Response } from 'express';
import { processRequestBody } from 'zod-express-middleware';

import { registerUserHandler } from './user.controller';
import { registerUserSchema } from './user.schema';
import requireUser from '../../middleware/requireUser';

const router = express.Router();

router.get('');

router.get('/me', requireUser, (_req: Request, res: Response) => {
  return res.send(res.locals.user);
});

router.post(
  '/',
  processRequestBody(registerUserSchema.body),
  registerUserHandler
);

export default router;
