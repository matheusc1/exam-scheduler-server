import { and, eq, gt } from 'drizzle-orm'
import { db } from '../../db'
import { discipline, enrollment, examSchedule } from '../../db/schema'

interface GetStudentSchedulesRequest {
  studentRa: string
}

export async function getStudentSchedules({
  studentRa,
}: GetStudentSchedulesRequest) {
  const schedules = await db
    .select({
      id: examSchedule.id,
      type: examSchedule.type,
      scheduledDate: examSchedule.scheduledDate,
    })
    .from(examSchedule)
    .innerJoin(
      enrollment,
      and(
        eq(enrollment.id, examSchedule.enrollmentId),
        eq(enrollment.studentRa, studentRa)
      )
    )
    .innerJoin(discipline, eq(discipline.id, enrollment.disciplineId))
    .orderBy(
      gt(examSchedule.scheduledDate, new Date()),
      examSchedule.scheduledDate
    )

  const categorizedSchedules = schedules.map(schedule => ({
    id: schedule.id,
    type: schedule.type === 'mandatory' ? 'A2' : 'A3',
    scheduledDate: schedule.scheduledDate,
  }))

  return categorizedSchedules
}
