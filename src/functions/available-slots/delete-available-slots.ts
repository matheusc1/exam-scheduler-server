import type { Dayjs } from 'dayjs'
import { db } from '../../db'
import { availableSlots } from '../../db/schema'
import { and, eq } from 'drizzle-orm'

interface DeleteAvailableSlotsRequest {
  supportCenterId: string
  selectedDate: Dayjs
}

export async function deleteAvailableSlots({
  supportCenterId,
  selectedDate,
}: DeleteAvailableSlotsRequest) {
  await db
    .delete(availableSlots)
    .where(
      and(
        eq(availableSlots.supportCenter, supportCenterId),
        eq(availableSlots.date, selectedDate.toDate())
      )
    )
}

export async function deleteAllAvailableSlots() {
  await db.delete(availableSlots)
}
