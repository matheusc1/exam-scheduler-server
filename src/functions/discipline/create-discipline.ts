import { discipline } from '../../db/schema'
import { createRecords } from '../db-utils/create-records'

export interface CreateDisciplineRequest {
  name: string
}

export async function createDiscipline({ name }: CreateDisciplineRequest) {
  await createRecords(discipline, { name })
}
