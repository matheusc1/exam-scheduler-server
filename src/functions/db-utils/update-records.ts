import type { AnyPgTable, AnyPgColumn } from 'drizzle-orm/pg-core'
import { db } from '../../db'
import { eq, type InferInsertModel } from 'drizzle-orm'

export async function updateRecords<T extends AnyPgTable>(
  schema: T,
  values: InferInsertModel<T>,
  schemaId: AnyPgColumn,
  id: string
) {
  await db.update(schema).set(values).where(eq(schemaId, id))
}
