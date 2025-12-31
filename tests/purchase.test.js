const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/User')
const Product = require('../models/Product')

let token = ''
let productId = ''

beforeAll(async () => {
  await User.deleteMany({})
  await Product.deleteMany({})

  await request(app).post('/api/users/register').send({
    email: 'testuser@gmail.com',
    password: '123456',
    balance: 5000
  })

  const loginRes = await request(app).post('/api/users/login').send({
    email: 'testuser@gmail.com',
    password: '123456'
  })

  token = loginRes.body.token

  const productRes = await request(app)
    .post('/api/products')
    .set('Authorization', token)
    .send({
      name: 'Test Product',
      price: 1000,
      available_qty: 5
    })

  productId = productRes.body._id
})

afterAll(async () => {
  await mongoose.connection.close()
})

test('Purchase product', async () => {
  const res = await request(app)
    .post(`/api/purchase/${productId}`)
    .set('Authorization', token)

  expect(res.statusCode).toBe(200)
  expect(res.body.message).toBe('Product purchased successfully')
  expect(res.body.remainingBalance).toBe(4000)
})
