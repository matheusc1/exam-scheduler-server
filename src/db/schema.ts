import { createId } from '@paralleldrive/cuid2'
import { pgTable, text } from 'drizzle-orm/pg-core'

export const test = pgTable('test', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
})
