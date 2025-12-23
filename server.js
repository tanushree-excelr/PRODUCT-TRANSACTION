const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')
const logger = require('./logger')

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info('Server started using npm run dev')
    })
  })
  .catch(err => {
    logger.error(err.message)
  })
