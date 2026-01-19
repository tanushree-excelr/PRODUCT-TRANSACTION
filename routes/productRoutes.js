const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const auth = require('../middleware/auth')

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               price:
 *                 type: number
 *                 example: 79999
 *     responses:
 *       201:
 *         description: Product created
 */
router.post('/', auth, async (req, res) => {
  const product = await Product.create(req.body)
  res.status(201).json(product)
})

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Products list
 */
router.get('/', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

module.exports = router
