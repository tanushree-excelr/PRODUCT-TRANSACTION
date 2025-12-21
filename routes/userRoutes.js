const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/register', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10)
  const user = await User.create({
    email: req.body.email,
    password: hashed
  })
  res.json(user)
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  const valid = await bcrypt.compare(req.body.password, user.password)
  if (!valid) return res.status(400).json({ message: 'invalid' })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  res.json({ token })
})

module.exports = router
