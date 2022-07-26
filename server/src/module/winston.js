const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
require("moment-timezone");
const moment = require("moment");

const { combine, timestamp, printf, colorize } = winston.format;

const logDir = "logs"; // logs 디렉토리 하위에 로그 파일 저장

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};
winston.addColors(colors);

moment.tz.setDefault("Asia/Seoul");
const timeStamp = () => moment().format("YYYY-MM-DD HH:mm:ss");

const logFormat = printf((info) => {
  return `${timeStamp()} [${info.level}] ${info.message}`;
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */

const logger = winston.createLogger({
  format: logFormat,
  colorize: true,
  transports: [
    new winstonDaily({
      level: "info",
      dirname: logDir,
      filename: `%DATE%.log`, // file 이름은 날짜로 저장
      maxFiles: 30,
    }),
    new winstonDaily({
      level: "error",
      dirname: logDir,
      filename: `%DATE%.error.log`,
      maxFiles: 30,
    }),
  ],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: logFormat,
      handleExceptions: true,
    })
  );
}

module.exports = logger;
