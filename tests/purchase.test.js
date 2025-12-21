jest.setTimeout(20000)
const request = require('supertest')
const app = require('../app')

let token = ''
let productId = ''

beforeAll(async () => {
  const login = await request(app)
    .post('/api/users/login')
    .send({ email: 'test@gmail.com', password: '123456' })

  token = login.body.token

  const product = await request(app)
    .post('/api/products')
    .set('Authorization', token)
    .send({ name: 'Laptop', amount: 200, available_qty: 2 })

  productId = product.body._id
})

test('Purchase product', async () => {
  const res = await request(app)
    .post(`/api/purchase/${productId}`)
    .set('Authorization', token)

  expect(res.body.message).toBe('purchased')
})
