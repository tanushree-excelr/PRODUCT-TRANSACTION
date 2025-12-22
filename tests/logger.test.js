const fs = require('fs')
const request = require('supertest')
const app = require('../app')

test('API call should create log entry', async () => {
  await request(app).get('/api/users')

  const logs = fs.readFileSync('logs/combined.log', 'utf8')
  expect(logs.length).toBeGreaterThan(0)
})
