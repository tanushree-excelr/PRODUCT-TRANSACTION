const winston = require('winston')
require('winston-daily-rotate-file')

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
)

const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d'
})

const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    transport
  ]
})

module.exports = logger
