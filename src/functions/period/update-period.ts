import { period } from '../../db/schema'
import type { CreatePeriodRequest } from './create-period'
import { updateRecords } from '../db-utils/update-records'

interface UpdatePeriodRequest extends CreatePeriodRequest {
  id: string
}

export async function updatePeriod({
  id,
  startDate,
  endDate,
}: UpdatePeriodRequest) {
  await updateRecords(
    period,
    { startDate: startDate.toDate(), endDate: endDate.toDate() },
    period.id,
    id
  )
}
