jest.setTimeout(20000)
const request = require('supertest')
const app = require('../app')

let token = ''

beforeAll(async () => {
  const res = await request(app)
    .post('/api/users/login')
    .send({ email: 'test@gmail.com', password: '123456' })
  token = res.body.token
})

test('Create product', async () => {
  const res = await request(app)
    .post('/api/products')
    .set('Authorization', token)
    .send({ name: 'Phone', amount: 100, available_qty: 5 })
  expect(res.statusCode).toBe(200)
})
