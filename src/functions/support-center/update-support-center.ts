import { supportCenter } from '../../db/schema'
import type { CreateSupportCenterRequest } from './create-support-center'
import { updateRecords } from '../db-utils/update-records'

interface UpdateSupportCenterRequest extends CreateSupportCenterRequest {
  id: string
}

export async function updateSupportCenter({
  id,
  name,
  numberOfComputers,
}: UpdateSupportCenterRequest) {
  await updateRecords(
    supportCenter,
    { name, numberOfComputers },
    supportCenter.id,
    id
  )
}
