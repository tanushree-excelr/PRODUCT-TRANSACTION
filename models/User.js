const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  name:String,
  email:{type:String,unique:true},
  password:String,
  amount_available:{type:Number,default:0}
},{timestamps:true})
userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
userSchema.methods.comparePassword = function(p){ return require('bcrypt').compare(p,this.password) }
module.exports = mongoose.model('User', userSchema)
