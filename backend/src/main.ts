import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';

import { connectToDatabase, disconnectFromDatabase } from './utils/database';
import logger from './utils/logger';

import userRoute from './modules/user/user.route';
import authRoute from './modules/auth/auth.route';
import videoRoute from './modules/video/video.route';

import { CORS_ORIGIN } from './constants';
import deserializeUser from './middleware/deserializeUser';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);

app.use('/healthcheck', (req, res) => {
  console.log(res.locals.user);
  res.send('OK');
});
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/videos', videoRoute);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server running in port http://localhost:${PORT}`);
});

const signals = ['SIGTERM', 'SIGINT'];

function graceFulShutDown(signal: string) {
  process.on(signal, async () => {
    logger.info('Goodbye, Got signal:', signal);
    server.close();
    logger.info('My work here is done"');
    await disconnectFromDatabase();
    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  graceFulShutDown(signals[i]);
}
