import { eq, and, gt, lte, gte } from 'drizzle-orm'
import dayjs, { type Dayjs } from 'dayjs'
import { db } from '../../db'
import { availableSlots, supportCenterOperatingHours } from '../../db/schema'

interface GetAvailableSlotsParams {
  selectedDate: Dayjs
  supportCenterId: string
}

export async function getAvailableSlots({
  selectedDate,
  supportCenterId,
}: GetAvailableSlotsParams) {
  // Converte a data para o dia da semana (0 = domingo, 6 = sábado)
  const weekDay = dayjs(selectedDate).day()

  // Passo 1: Obtenha os horários de funcionamento do centro de suporte no dia selecionado
  const operatingHours = await db
    .select()
    .from(supportCenterOperatingHours)
    .where(
      and(
        eq(supportCenterOperatingHours.supportCenter, supportCenterId),
        eq(supportCenterOperatingHours.weekDay, weekDay)
      )
    )

  // Verifica se encontrou horários de funcionamento para o dia selecionado
  if (!operatingHours.length) {
    throw new Error('Centro de suporte não funciona no dia selecionado')
  }

  const { openTime, closeTime } = operatingHours[0] // Horário de funcionamento

  // Passo 2: Query para buscar horários disponíveis dentro do horário de funcionamento
  const availableTimes = await db
    .select({
      id: availableSlots.id,
      time: availableSlots.time,
      availableSlots: availableSlots.availableSlots,
    })
    .from(availableSlots)
    .where(
      and(
        eq(availableSlots.date, selectedDate.toDate()),
        eq(availableSlots.supportCenter, supportCenterId),
        gt(availableSlots.availableSlots, 0), // Só horários com vagas
        gte(availableSlots.time, openTime), // Dentro do horário de abertura
        lte(availableSlots.time, closeTime) // Dentro do horário de fechamento
      )
    )
    .orderBy(availableSlots.time)

  return availableTimes
}
