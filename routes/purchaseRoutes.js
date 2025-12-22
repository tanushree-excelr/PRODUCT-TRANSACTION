const express = require('express')
const Product = require('../models/Product')
const User = require('../models/User')
const Transaction = require('../models/Transaction')
const auth = require('../middleware/auth')
const logger = require('../logger')

const router = express.Router()

router.post('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    const user = await User.findById(req.userId)

    if (!product || product.available_qty <= 0) {
      logger.error('Product not available')
      return res.status(400).json({ message: 'not available' })
    }

    if (user.amount_available < product.amount) {
      logger.error('Insufficient balance')
      return res.status(400).json({ message: 'insufficient balance' })
    }

    product.available_qty -= 1
    user.amount_available -= product.amount

    await product.save()
    await user.save()

    await Transaction.create({
      productId: product._id,
      userId: user._id,
      amount: product.amount,
      status: 'debit'
    })

    logger.info('Product purchased successfully')
    res.json({ message: 'purchased' })
  } catch (err) {
    logger.error(err.message)
    res.status(500).json({ message: 'server error' })
  }
})

module.exports = router
