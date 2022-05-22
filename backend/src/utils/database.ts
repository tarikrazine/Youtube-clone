import mongoose from 'mongoose';

import logger from './logger';

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/youtube-clone';

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info('Connected to database');
  } catch (e) {
    logger.info('Error connecting to database:', e);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close(); // disconnect from database
  logger.info('Disconnected from database');
}
