import type { Dayjs } from 'dayjs'
import { db } from '../../db'
import { availableSlots } from '../../db/schema'
import { and, eq } from 'drizzle-orm'

interface UpdateAvailableSlotsRequest {
  date: Dayjs
  incrementBy: number
  supportCenterId: string
}

export async function updateAvailableSlots({
  date,
  incrementBy,
  supportCenterId,
}: UpdateAvailableSlotsRequest) {
  // Formata a data e hora usando Dayjs
  const formattedDate = date.format('YYYY-MM-DD')
  const formattedTime = date.format('HH:mm')

  // Consulta o slot atual baseado na data e horário
  const [currentRecord] = await db
    .select({ availableSlots: availableSlots.availableSlots })
    .from(availableSlots)
    .where(
      and(
        eq(availableSlots.date, new Date(formattedDate)),
        eq(availableSlots.time, formattedTime),
        eq(availableSlots.supportCenter, supportCenterId)
      )
    )
    .limit(1)

  // Atualiza o número de slots disponíveis, garantindo que o mínimo seja 0
  if (currentRecord) {
    const newSlots = Math.max(0, currentRecord.availableSlots + incrementBy)

    await db
      .update(availableSlots)
      .set({ availableSlots: newSlots })
      .where(
        and(
          eq(availableSlots.date, new Date(formattedDate)),
          eq(availableSlots.time, formattedTime),
          eq(availableSlots.supportCenter, supportCenterId)
        )
      )
  }
}
