const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const transport = new DailyRotateFile({
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d'
})

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    transport,
    new winston.transports.Console()
  ]
})

module.exports = logger
