import { discipline } from '../../db/schema'
import type { createDisciplineRequest } from './create-discipline'
import { updateRecords } from '../db-utils/update-records'

interface updateDisciplineRequest extends createDisciplineRequest {
  id: string
}

export async function updateDiscipline({ id, name }: updateDisciplineRequest) {
  await updateRecords(discipline, { name }, discipline.id, id)
}
