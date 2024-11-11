import { period } from '../../db/schema'
import { deleteRecords } from '../db-utils/delete-records'

interface DeletePeriodRequest {
  id: string
}

export async function deletePeriod({ id }: DeletePeriodRequest) {
  await deleteRecords(period, period.id, id)
}
