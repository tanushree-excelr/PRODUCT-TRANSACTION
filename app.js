const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/purchase', purchaseRoutes)
app.use('/api/transactions', transactionRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = app
