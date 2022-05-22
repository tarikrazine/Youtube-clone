import { TypeOf, object, string } from 'zod';

export const loginSchema = {
  body: object({
    email: string({
      required_error: 'Email is required.',
    }).email('Not valid email'),
    password: string({
      required_error: 'Password is required.',
    })
      .min(6, 'Password must be at least 6 characters long')
      .max(64, 'Password should not be longer than 64 characters'),
  }),
};

export type LoginBody = TypeOf<typeof loginSchema.body>;
