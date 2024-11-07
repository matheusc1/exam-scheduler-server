import type { Dayjs } from 'dayjs'
import { db } from '../../db'
import { availableSlots } from '../../db/schema'
import { and, eq } from 'drizzle-orm'

interface UpdateAvailableSlotsRequest {
  date: Dayjs
  slots: number
  supportCenterId: string
  time: string
}

export async function updateAvailableSlots({
  date,
  slots,
  supportCenterId,
  time,
}: UpdateAvailableSlotsRequest) {
  await db
    .update(availableSlots)
    .set({ availableSlots: slots })
    .where(
      and(
        eq(availableSlots.date, date.toDate()),
        eq(availableSlots.supportCenter, supportCenterId),
        eq(availableSlots.time, time)
      )
    )
}
