const fs = require('fs')
const request = require('supertest')
const app = require('../app')

test('Daily log file should be created', async () => {
  await request(app).post('/api/users/register')
    .send({ email: 'log@test.com', password: '123456' })

  const files = fs.readdirSync('logs')
  expect(files.length).toBeGreaterThan(0)
})
