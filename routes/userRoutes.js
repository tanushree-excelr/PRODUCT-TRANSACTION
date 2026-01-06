const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register user
 */
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body
  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hash, role })
  res.json(user)
})

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ message: 'Invalid' })
  const token = jwt.sign({ id: user._id, role: user.role }, 'secret')
  res.json({ token })
})

module.exports = router
