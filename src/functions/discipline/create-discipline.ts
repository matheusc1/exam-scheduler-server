import { discipline } from '../../db/schema'
import { createRecords } from '../db-utils/create-records'

export interface createDisciplineRequest {
  name: string
}

export async function createDiscipline({ name }: createDisciplineRequest) {
  await createRecords(discipline, { name })
}
