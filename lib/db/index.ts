import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"

function createDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set")
  }

  // Pooled HTTP connection — safe for serverless/edge and Next.js Server Components.
  const sql = neon(process.env.DATABASE_URL)

  return drizzle({ client: sql, schema, casing: "snake_case" })
}

let cachedDb: ReturnType<typeof createDb> | undefined

// Lazily create the client so importing this module (e.g. during build page
// data collection) doesn't throw when DATABASE_URL is only set at runtime.
export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop) {
    if (!cachedDb) cachedDb = createDb()
    return Reflect.get(cachedDb, prop)
  },
})

export { schema }
