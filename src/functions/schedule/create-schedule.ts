import type { Dayjs } from 'dayjs'
import { db } from '../../db'
import { enrollment, examSchedule, student } from '../../db/schema'
import { updateAvailableSlots } from '../available-slots/update-available-slots'
import { and, eq } from 'drizzle-orm'

export interface CreateScheduleRequest {
  enrollmentId: string
  type: 'mandatory' | 'substitute'
  scheduledDate: Dayjs
}

export async function createSchedule({
  enrollmentId,
  type,
  scheduledDate,
}: CreateScheduleRequest) {
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

  // Se o tipo for "substitute", verifica se já existe uma avaliação "mandatory"
  if (type === 'substitute') {
    const mandatoryExam = await db
      .select()
      .from(examSchedule)
      .where(
        and(
          eq(examSchedule.enrollmentId, enrollmentId),
          eq(examSchedule.type, 'mandatory')
        )
      )
      .limit(1)

    if (!mandatoryExam.length) {
      throw new Error(
        'A mandatory exam must be scheduled before a substitute exam.'
      )
    }
  }

  await db.insert(examSchedule).values({
    enrollmentId,
    type,
    scheduledDate: scheduledDate.toDate(),
  })

  await updateAvailableSlots({
    date: scheduledDate,
    incrementBy: -1,
    supportCenterId,
  })
}
