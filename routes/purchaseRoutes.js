const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const User = require('../models/User')
const Product = require('../models/Product')
const Transaction = require('../models/Transaction')
router.post('/:productId', auth, async (req,res)=>{
  const session = await mongoose.startSession()
  session.startTransaction()
  try{
    const user = await User.findById(req.user.userId).session(session)
    const product = await Product.findById(req.params.productId).session(session)
    if(!product) throw new Error('product not found')
    if(product.available_qty <= 0) throw new Error('out of stock')
    if(user.amount_available < product.amount) throw new Error('insufficient balance')
    user.amount_available = user.amount_available - product.amount
    product.available_qty = product.available_qty - 1
    await user.save({session})
    await product.save({session})
    await Transaction.create([{
      productId:product._id,
      userId:user._id,
      amount:product.amount,
      status:'debit'
    }],{session})
    await session.commitTransaction()
    session.endSession()
    res.json({message:'purchase successful'})
  }catch(e){
    await session.abortTransaction()
    session.endSession()
    res.status(400).json({message:e.message})
  }
})
module.exports = router
