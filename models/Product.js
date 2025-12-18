const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name:String,
  amount:Number,
  available_qty:Number
},{timestamps:true})
module.exports = mongoose.model('Product', schema)
