import { discipline } from '../../db/schema'
import { getRecords } from '../db-utils/get-records'

export async function getDisciplines() {
  const disciplines = await getRecords(discipline)

  return { disciplines }
}
