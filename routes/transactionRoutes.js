const express = require('express')
const Transaction = require('../models/Transaction')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', auth, async (req, res) => {
  const txns = await Transaction.find({ userId: req.user._id })
  res.json(txns)
})

module.exports = router
