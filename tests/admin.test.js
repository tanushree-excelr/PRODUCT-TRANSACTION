const request = require('supertest')
const app = require('../app')

test('admin search users', async () => {
  const res = await request(app).get('/api/admin/users?query=a')
  expect(res.statusCode).toBe(403)
})
