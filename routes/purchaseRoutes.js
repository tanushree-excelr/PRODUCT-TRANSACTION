const express = require('express')
const Product = require('../models/Product')
const User = require('../models/User')
const Transaction = require('../models/Transaction')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/:id', auth, async (req, res) => {
  const product = await Product.findById(req.params.id)
  const user = await User.findById(req.userId)

  if (!product || product.available_qty <= 0)
    return res.status(400).json({ message: 'not available' })

  if (user.amount_available < product.amount)
    return res.status(400).json({ message: 'insufficient balance' })

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

  res.json({ message: 'purchased' })
})

module.exports = router
