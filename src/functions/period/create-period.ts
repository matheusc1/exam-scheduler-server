import type { Dayjs } from 'dayjs'
import { period } from '../../db/schema'
import { createRecords } from '../db-utils/create-records'

export interface createPeriodRequest {
  startDate: Dayjs
  endDate: Dayjs
}

export async function createPeriod({
  startDate,
  endDate,
}: createPeriodRequest) {
  await createRecords(period, {
    startDate: startDate.toDate(),
    endDate: endDate.toDate(),
  })
}
