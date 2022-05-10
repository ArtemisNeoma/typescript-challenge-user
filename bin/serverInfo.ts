import { createLogger, format, transports } from 'winston';

const myFormat = format.printf(({
  level, message, label, timestamp,
}) => `[${timestamp} - ${label}] ${level}: ${message}`);

const serverLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.label({ label: 'test' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    myFormat,
  ),
  defaultMeta: { service: 'Server Info' },
  transports: [
    new transports.Console(),
  ],
});

export function onError(error: NodeJS.ErrnoException, port: string | number) :never {
  if (error.syscall !== 'listen') throw error;
  switch (error.code) {
    case 'EACESS':
      serverLogger.log({
        level: 'error',
        message: `${port} requires elevated privileges`,
      });
      process.exit(1);
      break;
    case 'EADDRINUSE':
      serverLogger.log({
        level: 'error',
        message: `Address ${port} is already in use`,
      });
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export function onListening(port: string | number) {
  serverLogger.log({
    level: 'info',
    message: `Listening on port ${port}`,
  });
}
