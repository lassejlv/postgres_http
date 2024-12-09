import { createMiddleware } from "hono/factory"

export const authMiddleware = createMiddleware(async (c, next) => {

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
