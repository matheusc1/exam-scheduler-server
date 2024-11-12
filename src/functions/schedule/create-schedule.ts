import type { Dayjs } from 'dayjs'
import { db } from '../../db'
import { enrollment, examSchedule, student } from '../../db/schema'
import { updateAvailableSlots } from '../available-slots/update-available-slots'
import { eq } from 'drizzle-orm'

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
