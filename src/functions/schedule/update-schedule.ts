import type { Dayjs } from 'dayjs'
import { db } from '../../db'
import { enrollment, examSchedule, student } from '../../db/schema'
import { updateAvailableSlots } from '../available-slots/update-available-slots'
import { eq } from 'drizzle-orm'
import dayjs from 'dayjs'

interface UpdateScheduleRequest {
  id: string
  newScheduledDate: Dayjs
}

export async function updateSchedule({
  id,
  newScheduledDate,
}: UpdateScheduleRequest) {
  // Buscar o agendamento atual
  const [currentSchedule] = await db
    .select({
      enrollmentId: examSchedule.enrollmentId,
      scheduledDate: examSchedule.scheduledDate,
    })
    .from(examSchedule)
    .where(eq(examSchedule.id, id))
    .limit(1)

  if (!currentSchedule) {
    throw new Error('Schedule not found.')
  }

  const { enrollmentId, scheduledDate: oldDate } = currentSchedule

  // Buscar o supportCenterId do aluno
  const [result] = await db
    .select({ supportCenterId: student.supportCenter })
    .from(enrollment)
    .where(eq(enrollment.id, enrollmentId))
    .innerJoin(student, eq(student.ra, enrollment.studentRa))
    .limit(1)

  const supportCenterId = result?.supportCenterId

  if (!supportCenterId) {
    throw new Error('Support center not found for the given enrollment ID.')
  }

  // Atualizar as vagas para a data antiga
  await updateAvailableSlots({
    date: dayjs(oldDate),
    incrementBy: 1,
    supportCenterId,
  })

  // Atualizar as vagas para a nova data
  await updateAvailableSlots({
    date: newScheduledDate,
    incrementBy: -1,
    supportCenterId,
  })

  // Atualizar o agendamento com a nova data
  await db
    .update(examSchedule)
    .set({ scheduledDate: newScheduledDate.toDate() })
    .where(eq(examSchedule.id, id))
}
