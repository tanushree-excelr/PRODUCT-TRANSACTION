const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const User = require('../models/User')
const Transaction = require('../models/Transaction')

/**
 * @swagger
 * /api/purchase/{productId}:
 *   post:
 *     summary: Purchase product
 */
router.post('/:productId', async (req, res) => {
  const user = await User.findOne()
  const product = await Product.findById(req.params.productId)

  if (product.available_qty <= 0)
    return res.status(400).json({ message: 'Out of stock' })

  product.available_qty--
  user.amount_available -= product.amount

  await product.save()
  await user.save()

  await Transaction.create({
    userId: user._id,
    productId: product._id,
    amount: product.amount,
    status: 'debit'
  })

  res.json({ message: 'purchased' })
})

module.exports = router
