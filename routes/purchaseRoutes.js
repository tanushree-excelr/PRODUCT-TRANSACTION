const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Product = require('../models/Product')
const authMiddleware = require('../middleware/auth')
const logger = require('../logger')

router.post('/:productId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id
    const productId = req.params.productId

    const user = await User.findById(userId)
    const product = await Product.findById(productId)

    if (!product) {
      logger.error(`Product not found: ${productId}`)
      return res.status(404).json({ message: 'Product not found' })
    }

    if (product.available_qty <= 0) {
      logger.error(`Product out of stock: ${product.name}`)
      return res.status(400).json({ message: 'Product out of stock' })
    }

    if (user.balance < product.price) {
      logger.error(
        `Insufficient balance | User: ${user.email} | Balance: ${user.balance}`
      )
      return res.status(400).json({ message: 'Insufficient balance' })
    }

    product.available_qty -= 1
    await product.save()

    user.balance -= product.price
    await user.save()

    logger.info(
      `Purchase successful | User: ${user.email} | Product: ${product.name} | Price: ${product.price}`
    )

    res.status(200).json({
      message: 'Product purchased successfully',
      product: product.name,
      remainingBalance: user.balance
    })
  } catch (error) {
    logger.error(`Purchase failed: ${error.message}`)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
