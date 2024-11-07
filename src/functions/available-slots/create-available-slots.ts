import { eq } from 'drizzle-orm'
import dayjs, { type Dayjs } from 'dayjs'
import { createId } from '@paralleldrive/cuid2'
import {
  supportCenter,
  supportCenterOperatingHours,
  availableSlots,
} from '../../db/schema'
import { db } from '../../db'

interface CreateAvailableSlotsRequest {
  supportCenterId: string
  startDate: Dayjs
  endDate: Dayjs
  weekDays: number[]
}

export async function createAvailableSlots({
  supportCenterId,
  startDate,
  endDate,
  weekDays,
}: CreateAvailableSlotsRequest) {
  // 1. Obtenha o `supportCenter` específico usando o ID
  const center = await db
    .select({
      id: supportCenter.id,
      numberOfComputers: supportCenter.numberOfComputers,
    })
    .from(supportCenter)
    .where(eq(supportCenter.id, supportCenterId))
    .then(rows => rows[0])

  if (!center) {
    throw new Error('Support Center não encontrado')
  }

  // Define o número de slots disponíveis como o número de computadores
  const computedAvailableSlots = center.numberOfComputers

  // 2. Obtenha os horários de funcionamento do Support Center
  const operatingHours = await db
    .select()
    .from(supportCenterOperatingHours)
    .where(eq(supportCenterOperatingHours.supportCenter, center.id))

  for (
    let date = startDate;
    date.isBefore(endDate);
    date = date.add(1, 'day')
  ) {
    const weekDay = date.day()

    // 3. Verifica se o dia da semana é um dos dias de funcionamento
    if (!weekDays.includes(weekDay)) continue

    // 4. Encontre o horário de funcionamento do centro para o dia da semana atual
    const hours = operatingHours.find(h => h.weekDay === weekDay)
    if (!hours) continue

    // Construa os horários disponíveis dentro do intervalo de funcionamento
    let currentTime = dayjs(`${date.format('YYYY-MM-DD')} ${hours.openTime}`)
    const closeTime = dayjs(`${date.format('YYYY-MM-DD')} ${hours.closeTime}`)

    while (currentTime.isBefore(closeTime)) {
      await db.insert(availableSlots).values({
        id: createId(),
        date: date.toDate(),
        time: currentTime.format('HH:mm'),
        availableSlots: computedAvailableSlots,
        supportCenter: center.id,
      })

      currentTime = currentTime.add(1, 'hour') // Incrementa 1 hora
    }
  }
}
