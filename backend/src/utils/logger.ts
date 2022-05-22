import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      prettyPrint: {
        colorize: true,
      },
    },
  },
});

export default logger;
