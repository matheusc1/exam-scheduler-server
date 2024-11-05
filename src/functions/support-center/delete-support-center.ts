import { supportCenter } from '../../db/schema'
import { deleteRecords } from '../db-utils/delete-records'

interface DeleteSupportCenterRequest {
  id: string
}

export async function deleteSupportCenter({ id }: DeleteSupportCenterRequest) {
  await deleteRecords(supportCenter, supportCenter.id, id)
}
