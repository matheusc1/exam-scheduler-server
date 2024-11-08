import { period } from '../../db/schema'
import { getRecords } from '../db-utils/get-records'

export async function getPeriods() {
  const periods = await getRecords(period)

  return { periods }
}
