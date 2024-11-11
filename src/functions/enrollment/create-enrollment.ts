import { db } from '../../db'
import { enrollment } from '../../db/schema'

export interface CreateEnrollmentRequest {
  studentRa: string[]
  disciplineId: string
  periodId: string
}

export async function createEnrollment({
  studentRa,
  disciplineId,
  periodId,
}: CreateEnrollmentRequest) {
  const studentRecords = studentRa.map(ra => ({
    studentRa: ra,
    disciplineId: disciplineId,
    periodId: periodId,
  }))

  try {
    await db.insert(enrollment).values(studentRecords)
    console.log('Alunos matriculados com sucesso!')
  } catch (error) {
    console.error('Erro ao matricular alunos:', error)
  }
}
