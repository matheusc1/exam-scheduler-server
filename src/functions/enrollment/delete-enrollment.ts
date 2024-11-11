import { enrollment } from '../../db/schema'
import { deleteRecords } from '../db-utils/delete-records'

interface deleteEnrollmentRequest {
  id: string
}

export async function deleteEnrollment({ id }: deleteEnrollmentRequest) {
  await deleteRecords(enrollment, enrollment.id, id)
}
