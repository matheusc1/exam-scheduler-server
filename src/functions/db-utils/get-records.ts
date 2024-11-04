import type { AnyPgTable } from 'drizzle-orm/pg-core'
import { db } from '../../db'

export async function getRecords<T extends AnyPgTable>(schema: T) {
  return await db.select().from(schema)
}
