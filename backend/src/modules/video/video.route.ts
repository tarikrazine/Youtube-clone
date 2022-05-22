import express from 'express';
import {
  processRequestParams,
  processRequestBody,
} from 'zod-express-middleware';

import requireUser from '../../middleware/requireUser';
import {
  uploadVideoHandler,
  findVideosHandler,
  updateVideoHandler,
  streamVideoHandler,
} from './video.controller';
import { updateVideoSchema } from './video.schema';

const router = express.Router();

router.get('/', findVideosHandler);

router.post('/', requireUser, uploadVideoHandler);

router.get('/:videoId', streamVideoHandler);

router.patch(
  '/:videoId',
  requireUser,
  processRequestParams(updateVideoSchema.params),
  processRequestBody(updateVideoSchema.body),
  updateVideoHandler
);

export default router;
