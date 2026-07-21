const { test, expect } = require('@playwright/test')
const BASE = 'http://127.0.0.1:3000'

test('POST without name returns 400', async ({ request }) => {
  const res = await request.post(`${BASE}/topics`, {
    data: {}
  })
  expect(res.status()).toBe(400)
  const body = await res.json()
  expect(body).toHaveProperty('error')
})

test('POST with number name returns 400', async ({ request }) => {
  const res = await request.post(`${BASE}/topics`, {
    data: { name: 123 }
  })
  expect(res.status()).toBe(400)
})

test('POST with 1 character returns 400', async ({ request }) => {
  const res = await request.post(`${BASE}/topics`, {
    data: { name: 'a' }
  })
  expect(res.status()).toBe(400)
})

test('POST with valid name returns 201', async ({ request }) => {
  const res = await request.post(`${BASE}/topics`, {
    data: { name: 'Valid Topic' }
  })
  expect(res.status()).toBe(201)
})

test('GET invalid id returns 400', async ({ request }) => {
  const res = await request.get(`${BASE}/topics/notanid`)
  expect(res.status()).toBe(400)
  const body = await res.json()
  expect(body.error).toBe('Invalid ID format')
})

test('unknown route returns 404', async ({ request }) => {
  const res = await request.get(`${BASE}/unknown`)
  expect(res.status()).toBe(404)
})