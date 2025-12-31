const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  productId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Transaction', transactionSchema)
