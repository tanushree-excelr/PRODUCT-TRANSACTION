const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  available_qty: Number
})

module.exports = mongoose.model('Product', productSchema)
