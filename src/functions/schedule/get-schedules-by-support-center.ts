import { db } from '../../db'
import { examSchedule, enrollment, student, discipline } from '../../db/schema'
import { eq, gt, gte, sql } from 'drizzle-orm'

interface GetScheduleBySupportCenterRequest {
  supportCenterId: string
}

export async function getAllSchedulesBySupportCenter({
  supportCenterId,
}: GetScheduleBySupportCenterRequest) {
  // Subconsulta para filtrar os alunos e disciplinas com base no supportCenterId
  const filteredEnrollments = db.$with('filtered_enrollments').as(
    db
      .select({
        enrollmentId: enrollment.id,
        studentName: sql`student.name`.as('studentName'),
        disciplineName: sql`discipline.name`.as('disciplineName'),
      })
      .from(enrollment)
      .innerJoin(student, eq(student.ra, enrollment.studentRa))
      .innerJoin(discipline, eq(discipline.id, enrollment.disciplineId))
      .where(eq(student.supportCenter, supportCenterId))
  )

  // Subconsulta para filtrar horários de exames com base nos enrollments filtrados
  const filteredExamSchedules = db.$with('filtered_exam_schedules').as(
    db
      .select({
        id: examSchedule.id,
        enrollmentId: examSchedule.enrollmentId,
        scheduledDate: examSchedule.scheduledDate,
        type: examSchedule.type,
      })
      .from(examSchedule)
      .innerJoin(
        filteredEnrollments,
        eq(examSchedule.enrollmentId, filteredEnrollments.enrollmentId)
      )
  )

  // Consulta final unindo todas as informações filtradas
  const schedules = await db
    .with(filteredEnrollments, filteredExamSchedules)
    .select({
      id: filteredExamSchedules.id,
      studentName: filteredEnrollments.studentName,
      disciplineName: filteredEnrollments.disciplineName,
      scheduledDate: filteredExamSchedules.scheduledDate,
      type: filteredExamSchedules.type,
    })
    .from(filteredExamSchedules)
    .innerJoin(
      filteredEnrollments,
      eq(filteredExamSchedules.enrollmentId, filteredEnrollments.enrollmentId)
    )
    .where(gte(filteredExamSchedules.scheduledDate, new Date()))
    .orderBy(
      gt(filteredExamSchedules.scheduledDate, new Date()),
      filteredExamSchedules.scheduledDate
    )

  return schedules.map(schedule => ({
    id: schedule.id,
    studentName: schedule.studentName,
    disciplineName: schedule.disciplineName,
    scheduledDate: schedule.scheduledDate,
    type: schedule.type === 'mandatory' ? 'A2' : 'A3',
  }))
}
