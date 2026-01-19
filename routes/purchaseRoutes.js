const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Transaction = require('../models/Transaction')
const auth = require('../middleware/auth')

/**
 * @swagger
 * /api/purchase/{productId}:
 *   post:
 *     summary: Purchase product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product purchased
 */
router.post('/:productId', auth, async (req, res) => {
  const product = await Product.findById(req.params.productId)
  if (!product) return res.status(404).json({ message: 'Product not found' })

  const transaction = await Transaction.create({
    user: req.user.id,
    product: product._id,
    amount: product.price
  })

  res.json(transaction)
})

module.exports = router
