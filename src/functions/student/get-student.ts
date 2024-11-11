import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { student, supportCenter } from '../../db/schema'
import dayjs from 'dayjs'

interface GetStudentByIdRequest {
  ra: string
}

export async function getStudents() {
  const students = await db
    .select({
      id: student.id,
      ra: student.ra,
      name: student.name,
      email: student.email,
      birthDate: student.birthDate,
      supportCenter: supportCenter.name,
    })
    .from(student)
    .innerJoin(supportCenter, eq(supportCenter.id, student.supportCenter))
    .orderBy(student.ra)

  const formattedStudents = students.map(student => ({
    ...student,
    birthDate: dayjs(student.birthDate).format('DD-MM-YYYY'),
  }))

  return { students: formattedStudents }
}

export async function getStudentById({ ra }: GetStudentByIdRequest) {
  const studentData = await db
    .select({
      id: student.id,
      ra: student.ra,
      name: student.name,
      email: student.email,
      birthDate: student.birthDate,
      supportCenter: supportCenter.name,
    })
    .from(student)
    .innerJoin(supportCenter, eq(supportCenter.id, student.supportCenter))
    .where(eq(student.ra, ra))
    .orderBy(student.ra)

  const formattedStudentData = studentData
    ? {
        ...studentData[0],
        birthDate: dayjs(studentData[0].birthDate).format('DD-MM-YYYY'),
      }
    : null

  return formattedStudentData
}
