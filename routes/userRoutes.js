const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get users (admin)
 */
router.get('/', auth, async (req, res) => {
  const query = req.query.q
  const filter = query ? { name: new RegExp(`^${query}`, 'i') } : {}
  const users = await User.find(filter)
  res.json(users)
})

router.delete('/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user.role !== 'guest') {
    return res.status(400).json({ message: 'Only guest users can be deleted' })
  }
  user.isDeleted = true
  await user.save()
  res.json({ message: 'User soft deleted' })
})

router.post('/restore/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id)
  user.isDeleted = false
  user.comments.push({
    message: req.body.message,
    timestamp: Date.now()
  })
  await user.save()
  res.json({ message: 'User restored' })
})

module.exports = router
