import { supportCenter } from '../../db/schema'
import { createRecords } from '../db-utils/create-records'

export interface createSupportCenterRequest {
  name: string
  numberOfComputers: number
}

export async function createSupportCenter({
  name,
  numberOfComputers,
}: createSupportCenterRequest) {
  await createRecords(supportCenter, { name, numberOfComputers })
}
