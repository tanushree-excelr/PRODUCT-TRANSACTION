const express = require('express')
const Product = require('../models/Product')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, async (req, res) => {
  const product = await Product.create(req.body)
  res.json(product)
})

router.get('/', auth, async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

module.exports = router
