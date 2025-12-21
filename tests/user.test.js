jest.setTimeout(20000)
const request = require('supertest')
const app = require('../app')

test('Register user', async () => {
  const res = await request(app)
    .post('/api/users/register')
    .send({ email: 'test@gmail.com', password: '123456' })
  expect(res.statusCode).toBe(200)
})

test('Login user', async () => {
  const res = await request(app)
    .post('/api/users/login')
    .send({ email: 'test@gmail.com', password: '123456' })
  expect(res.body.token).toBeDefined()
})
