import { supportCenter } from '../../db/schema'
import { getRecords } from '../db-utils/get-records'

export async function getSupportCenters() {
  const supportCenters = await getRecords(supportCenter)

  return { supportCenters }
}
