const express = require('express')
const Product = require('../models/Product')
const Transaction = require('../models/Transaction')
const auth = require('../middleware/auth')
const logger = require('../logger')

const router = express.Router()

router.post('/:productId', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)

    if (!product || product.available_qty <= 0) {
      return res.status(400).json({ message: 'Product unavailable' })
    }

    product.available_qty -= 1
    await product.save()

    await Transaction.create({
      userId: req.user._id,
      productId: product._id,
      amount: product.price
    })

    logger.info(`Purchase done by ${req.user.email}`)

    res.json({ message: 'purchased' })
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
