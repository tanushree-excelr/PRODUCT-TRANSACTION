const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')
const auth = require('../middleware/auth')

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions list
 */
router.get('/', auth, async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id })
  res.json(transactions)
})

module.exports = router
