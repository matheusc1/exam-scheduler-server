import { discipline } from '../../db/schema'
import { deleteRecords } from '../db-utils/delete-records'

interface DeleteDisciplineRequest {
  id: string
}

export async function deleteDiscipline({ id }: DeleteDisciplineRequest) {
  await deleteRecords(discipline, discipline.id, id)
}
