import { supportCenter } from '../../db/schema'
import { createRecords } from '../db-utils/create-records'

export interface CreateSupportCenterRequest {
  name: string
  numberOfComputers: number
}

export async function createSupportCenter({
  name,
  numberOfComputers,
}: CreateSupportCenterRequest) {
  await createRecords(supportCenter, { name, numberOfComputers })
}
