const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  message: String,
  timestamp: Number
})

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['admin', 'guest'],
    default: 'guest'
  },
  balance: {
    type: Number,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  comments: [commentSchema]
})

module.exports = mongoose.model('User', userSchema)
