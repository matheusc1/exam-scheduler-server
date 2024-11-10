import dayjs from 'dayjs'
import { db } from '../../db'
import { student } from '../../db/schema'
import * as argon2 from 'argon2'

export interface createStudentRequest {
  ra: string
  name: string
  email: string
  birthDate: string
  supportCenter: string
}

export async function createStudents(students: createStudentRequest[]) {
  const studentRecords = await Promise.all(
    students.map(async student => {
      const formattedBirthDate = dayjs(student.birthDate).format('DD-MM-YYYY')
      const password = formattedBirthDate.replace(/-/g, '')
      const hashedPassword = await argon2.hash(password)

      return {
        ra: student.ra,
        name: student.name,
        email: student.email,
        birthDate: dayjs(student.birthDate).toDate(),
        supportCenter: student.supportCenter,
        password: hashedPassword,
      }
    })
  )

  try {
    for (const record of studentRecords) {
      await db.insert(student).values(record)
    }
    console.log('Alunos registrados com sucesso!')
  } catch (error) {
    console.error('Erro ao registrar alunos:', error)
  }
}
