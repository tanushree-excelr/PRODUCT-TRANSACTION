const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tanushree
 *               email:
 *                 type: string
 *                 example: tanushree@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // validation added to stop crashes
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hash,
      role: role || 'user'
    })

    res.status(201).json({ message: 'Registered successfully', user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: tanushree@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login success + JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'secret',
      { expiresIn: '1d' }
    )

    res.json({ message: 'Login successful', token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
