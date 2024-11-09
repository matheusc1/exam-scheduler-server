import { discipline } from '../../db/schema'
import { deleteRecords } from '../db-utils/delete-records'

interface deleteDisciplineRequest {
  id: string
}

export async function deleteDiscipline({ id }: deleteDisciplineRequest) {
  await deleteRecords(discipline, discipline.id, id)
}
