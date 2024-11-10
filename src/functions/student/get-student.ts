import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { student } from '../../db/schema'
import { getRecords } from '../db-utils/get-records'

interface getStudentByIdRequest {
  ra: string
}

export async function getStudents() {
  const students = await getRecords(student)

  return { students }
}

export async function getStudentById({ ra }: getStudentByIdRequest) {
  const studentSelected = await db
    .select()
    .from(student)
    .where(eq(student.ra, ra))

  return { studentSelected }
}
