import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { schema } from "./schema";
import { pool } from "../..";




const router = new Hono()


router.post("/", zValidator("json", schema), async (c) => {

  try {
    const { table, where } = c.req.valid("json")

    const query = `SELECT * FROM ${table} WHERE ${where} LIMIT 1`;
    const result = await pool.query(query)

    return c.json(result)
  } catch (e: any) {
    return c.json({ error: e.message }, 400)
  }
})


export default router;
