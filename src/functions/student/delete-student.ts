import { student } from '../../db/schema'
import { deleteRecords } from '../db-utils/delete-records'

interface DeleteStudentRequest {
  ra: string
}

export async function deleteStudent({ ra }: DeleteStudentRequest) {
  await deleteRecords(student, student.ra, ra)
}
