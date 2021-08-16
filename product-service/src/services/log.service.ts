const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp: timeStamp, printf,
} = format;

const myFormat = printf(({
  level, message, timestamp,
}) => `${timestamp} ${level.toUpperCase()}: ${message}`);

const logger = createLogger({
  format: combine(
    format.splat(),
    timeStamp(),
    myFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;
