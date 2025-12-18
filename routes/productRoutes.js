const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const auth = require('../middleware/auth')
router.get('/', auth, async (req,res)=>{ const p = await Product.find({}); res.json(p) })
router.post('/', async (req,res)=>{ const p = new Product(req.body); await p.save(); res.json(p) })
module.exports = router
