import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { Pool } from 'pg'
import { z } from 'zod'
import { createMiddleware } from 'hono/factory'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const app = new Hono()

const schema = z.object({
  query: z.string(),
  args: z.array(z.any()).optional(),
})


const authMiddleware = createMiddleware(async (c, next) => {

  try {
    const auth = c.req.header("Authorization")
    if (!auth) throw new Error('No authorization header')

    const [type, token] = auth.split(' ')
    if (type !== 'Bearer') throw new Error('Invalid authorization type')

    const API_KEY = process.env.API_KEY
    if (token !== API_KEY) throw new Error('Invalid API key')

    return next()
  } catch (error: any) {
    return c.json({ error: error.message }, 401)
  }
})

app.post('/query', authMiddleware, zValidator('json', schema), async (c) => {
  try {
    const { query, args } = c.req.valid('json')

    if (query.toLowerCase().includes('drop') || query.toLowerCase().includes('delete') || query.toLowerCase().includes('truncate')) {
      throw new Error('Prohibited query detected')
    }


    const result = await pool.query(query, args);

    return c.json(result)
  } catch (error: any) {

    return c.json({ error: error.message }, 400)
  }
})

app.onError((error, c) => {
  console.error(error)
  return c.json({ error }, 500)
})

console.log('Listening on port', process.env.PORT)
Bun.serve({ port: process.env.PORT, fetch: app.fetch })
