import { enrollment } from '../../db/schema'
import { updateRecords } from '../db-utils/update-records'

interface updateEnrollmentRequest {
  id: string
  studentRa: string
  disciplineId: string
  periodId: string
}

export async function updateEnrollment({
  id,
  studentRa,
  disciplineId,
  periodId,
}: updateEnrollmentRequest) {
  await updateRecords(
    enrollment,
    { studentRa, disciplineId, periodId },
    enrollment.id,
    id
  )
}
