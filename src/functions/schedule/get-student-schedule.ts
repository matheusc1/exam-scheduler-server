import { and, eq, sql } from 'drizzle-orm'
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
      enrollmentId: examSchedule.enrollmentId,
      discipline: discipline.name,
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
      sql`CASE WHEN ${examSchedule.type} = 'mandatory' THEN 0 ELSE 1 END`, // Prioriza 'mandatory' com 0
      examSchedule.scheduledDate // Ordena pela data
    )

  const categorizedSchedules = schedules.map(schedule => ({
    id: schedule.id,
    enrollmentId: schedule.enrollmentId,
    discipline: schedule.discipline,
    type: schedule.type === 'mandatory' ? 'A2' : 'A3',
    scheduledDate: schedule.scheduledDate,
  }))

  return categorizedSchedules
}
