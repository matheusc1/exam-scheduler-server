import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { student, supportCenter } from '../../db/schema'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'

dayjs.extend(utc)

interface GetStudentByIdRequest {
  id: string
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
    birthDate: dayjs(student.birthDate).utc().format('DD-MM-YYYY'),
  }))

  return { students: formattedStudents }
}

export async function getStudentById({ id }: GetStudentByIdRequest) {
  const studentData = await db
    .select({
      id: student.id,
      ra: student.ra,
      name: student.name,
      email: student.email,
      birthDate: student.birthDate,
      supportCenter: {
        id: student.supportCenter,
        name: supportCenter.name,
      },
    })
    .from(student)
    .innerJoin(supportCenter, eq(supportCenter.id, student.supportCenter))
    .where(eq(student.id, id))

  const formattedStudentData = studentData
    ? {
        ...studentData[0],
        birthDate: dayjs(studentData[0].birthDate).utc().format('DD-MM-YYYY'),
      }
    : null

  return formattedStudentData
}
