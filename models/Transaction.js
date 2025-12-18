const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  amount:Number,
  status:{type:String,enum:['debit','credit']}
},{timestamps:true})
module.exports = mongoose.model('Transaction', schema)
