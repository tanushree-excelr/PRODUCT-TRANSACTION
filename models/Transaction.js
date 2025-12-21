const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  status: String
})

module.exports = mongoose.model('Transaction', transactionSchema)
