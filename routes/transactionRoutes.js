const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Transaction = require('../models/Transaction')
router.get('/me', auth, async (req,res)=>{
  const tx = await Transaction.find({userId:req.user.userId}).populate('productId')
  res.json(tx)
})
module.exports = router
