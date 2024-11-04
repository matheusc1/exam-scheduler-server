import type { AnyPgTable } from 'drizzle-orm/pg-core'
import { db } from '../../db'
import type { InferInsertModel } from 'drizzle-orm'

export async function createRecords<T extends AnyPgTable>(
  schema: T,
  values: InferInsertModel<T>
) {
  await db.insert(schema).values(values)
}
