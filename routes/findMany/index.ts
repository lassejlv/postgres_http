import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { pool } from "../../index";
import { findManySchema } from "./schema";


const router = new Hono();

router.get("/", zValidator("query", findManySchema), async (c) => {
  try {
    const { table, where, limit } = c.req.valid("query")

    const query = `SELECT * FROM ${table} WHERE ${where} LIMIT ${limit}`;
    const result = await pool.query(query);

    return c.json(result);
  } catch (e: any) {
    return c.json({ error: e.message }, 400);
  }
})


export default router;
