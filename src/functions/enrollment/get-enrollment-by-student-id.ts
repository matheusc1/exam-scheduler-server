import { db } from '../../db'
import { enrollment, student, discipline, period } from '../../db/schema'
import { eq } from 'drizzle-orm'

interface GetEnrollmentByStudentRaRequest {
  studentRa: string
}

export async function getEnrollmentByStudentRa({
  studentRa,
}: GetEnrollmentByStudentRaRequest) {
  const enrollmentData = await db
    .select({
      enrollmentId: enrollment.id,
      disciplineName: discipline.name,
      periodStartDate: period.startDate,
      periodEndDate: period.endDate,
    })
    .from(enrollment)
    .innerJoin(student, eq(student.ra, enrollment.studentRa))
    .innerJoin(discipline, eq(discipline.id, enrollment.disciplineId))
    .innerJoin(period, eq(period.id, enrollment.periodId))
    .where(eq(student.ra, studentRa))

  return enrollmentData
}
