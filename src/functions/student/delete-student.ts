import { student } from '../../db/schema'
import { deleteRecords } from '../db-utils/delete-records'

interface deleteStudentRequest {
  ra: string
}

export async function deleteStudent({ ra }: deleteStudentRequest) {
  await deleteRecords(student, student.ra, ra)
}
