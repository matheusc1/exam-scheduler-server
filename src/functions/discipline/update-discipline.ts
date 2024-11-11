import { discipline } from '../../db/schema'
import type { CreateDisciplineRequest } from './create-discipline'
import { updateRecords } from '../db-utils/update-records'

interface UpdateDisciplineRequest extends CreateDisciplineRequest {
  id: string
}

export async function updateDiscipline({ id, name }: UpdateDisciplineRequest) {
  await updateRecords(discipline, { name }, discipline.id, id)
}
