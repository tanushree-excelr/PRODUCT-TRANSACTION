const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  available_qty: Number
})

module.exports = mongoose.model('Product', productSchema)
