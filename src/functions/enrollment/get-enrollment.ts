import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { discipline, enrollment, period, student } from '../../db/schema'

export async function getEnrollments() {
  const enrollments = await db
    .select({
      id: enrollment.id,
      studentRa: enrollment.studentRa,
      studentName: student.name,
      discipline: discipline.name,
      periodStartDate: period.startDate,
      periodEndDate: period.endDate,
    })
    .from(enrollment)
    .innerJoin(student, eq(student.ra, enrollment.studentRa))
    .innerJoin(discipline, eq(discipline.id, enrollment.disciplineId))
    .innerJoin(period, eq(period.id, enrollment.periodId))
    .orderBy(enrollment.studentRa)

  return { enrollments }
}
