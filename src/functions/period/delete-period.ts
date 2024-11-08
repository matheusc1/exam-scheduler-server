import { period } from '../../db/schema'
import { deleteRecords } from '../db-utils/delete-records'

interface deletePeriodRequest {
  id: string
}

export async function deletePeriod({ id }: deletePeriodRequest) {
  await deleteRecords(period, period.id, id)
}
