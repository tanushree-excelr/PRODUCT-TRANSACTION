const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) return res.status(401).json({ message: 'Invalid user' })
    if (user.isDeleted) {
      return res.status(403).json({ message: 'user is deleted' })
    }

    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
