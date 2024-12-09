import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { Pool } from 'pg'
import { z } from 'zod'
import { logger } from 'hono/logger'
import { bearerAuth } from 'hono/bearer-auth'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // connection timeout = 1 minute
  connectionTimeoutMillis: 60 * 1000,
})

const app = new Hono()

const token = process.env.API_TOKEN;
if (!token) throw new Error('API_TOKEN is required')

app.use(logger())
app.use("*", bearerAuth({ token }))

const schema = z.object({
  query: z.string(),
  args: z.array(z.any()).optional(),
})

app.post('/query', zValidator('json', schema), async (c) => {
  try {
    const { query, args } = c.req.valid('json')

    const allowDangerousSqlCommands = process.env.ALLOW_DANGEROUS_SQL_COMMANDS === 'true'

    if (!allowDangerousSqlCommands && (query.includes('DROP') || query.includes('DELETE') || query.includes('TRUNCATE'))) {
      return c.json({ error: 'Dangerous SQL command' }, 400)
    }

    const result = await pool.query(query, args);

    return c.json(result)
  } catch (error: any) {

    return c.json({ error: error.message }, 400)
  }
})

app.get("/status", async (c) => {

  const start = Date.now()
  const isDbOkay = await pool.query('SELECT 1');

  return c.json({
    ok: isDbOkay.rows[0]["?column?"] === 1,
    ping: Date.now() - start,
  })
})

app.onError((error, c) => {
  console.error(error)
  return c.json({ error }, 500)
})

console.log('Listening on port', process.env.PORT)
Bun.serve({ port: process.env.PORT, fetch: app.fetch })
