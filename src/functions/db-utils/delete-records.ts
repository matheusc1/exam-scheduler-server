import type { AnyPgTable, AnyPgColumn } from 'drizzle-orm/pg-core'
import { db } from '../../db'
import { eq } from 'drizzle-orm'

export async function deleteRecords<T extends AnyPgTable>(
  schema: T,
  schemaId: AnyPgColumn,
  id: string
) {
  await db.delete(schema).where(eq(schemaId, id))
}
