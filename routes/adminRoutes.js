const express = require('express')
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')

router.post('/restore/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'access denied' })
  }

  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ message: 'user not found' })

  user.isDeleted = false
  user.deletedAt = null
  user.comments.push({
    message: req.body.message,
    timestamp: Date.now()
  })

  await user.save()
  res.json({ message: 'user restored' })
})

router.get('/users', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'access denied' })
  }

  const query = req.query.query || ''
  const users = await User.find({
    name: { $regex: `^${query}`, $options: 'i' }
  })

  res.json(users)
})

module.exports = router
