const express = require('express')
const cors = require('cors')
const logger = require('./logger')

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`)
  next()
})

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/transactions', require('./routes/transactionRoutes'))
app.use('/api/purchase', require('./routes/purchaseRoutes'))

module.exports = app
