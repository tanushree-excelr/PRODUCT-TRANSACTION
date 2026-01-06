const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get transactions
 */
router.get('/', async (req, res) => {
  const txns = await Transaction.find()
  res.json(txns)
})

module.exports = router
