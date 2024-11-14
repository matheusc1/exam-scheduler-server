import { and, eq, gt } from 'drizzle-orm'
import { db } from '../../db'
import { availableSlots } from '../../db/schema'

interface GetAvailableDatesRequest {
  supportCenterId: string
}

export async function getAvailableDates({
  supportCenterId,
}: GetAvailableDatesRequest) {
  const records = await db
    .select()
    .from(availableSlots)
    .where(
      and(
        eq(availableSlots.supportCenter, supportCenterId),
        gt(availableSlots.date, new Date())
      )
    )
    .orderBy(availableSlots.date)

  const uniqueDates = [
    ...new Set(records.map(record => record.date.toISOString().split('T')[0])),
  ]

  return uniqueDates
}
