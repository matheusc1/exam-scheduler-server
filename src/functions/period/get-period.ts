import { db } from '../../db'
import { period } from '../../db/schema'

export async function getPeriods() {
  const periods = await db.select().from(period).orderBy(period.startDate)

  return { periods }
}
