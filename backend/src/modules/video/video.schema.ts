import { TypeOf, object, string, boolean } from 'zod';

export const updateVideoSchema = {
  params: object({
    videoId: string({
      required_error: 'VideoId is required',
    }),
  }),
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: string({
      required_error: 'Description is required',
    }),
    published: boolean(),
  }),
};

export type UpdateVideoParams = TypeOf<typeof updateVideoSchema.params>;
export type UpdateVideoBody = TypeOf<typeof updateVideoSchema.body>;
