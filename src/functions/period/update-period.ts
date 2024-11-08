import { period } from '../../db/schema'
import type { createPeriodRequest } from './create-period'
import { updateRecords } from '../db-utils/update-records'

interface updatePeriodRequest extends createPeriodRequest {
  id: string
}

export async function updatePeriod({
  id,
  startDate,
  endDate,
}: updatePeriodRequest) {
  await updateRecords(
    period,
    { startDate: startDate.toDate(), endDate: endDate.toDate() },
    period.id,
    id
  )
}
