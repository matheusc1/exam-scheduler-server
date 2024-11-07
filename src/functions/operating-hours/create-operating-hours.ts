import { supportCenterOperatingHours } from '../../db/schema'
import { createRecords } from '../db-utils/create-records'

export interface CreateOperatingHoursRequest {
  supportCenter: string
  weekDay: number
  openTime: string
  closeTime: string
}

export async function createOperatingHours({
  supportCenter,
  weekDay,
  openTime,
  closeTime,
}: CreateOperatingHoursRequest) {
  await createRecords(supportCenterOperatingHours, {
    supportCenter,
    weekDay,
    openTime,
    closeTime,
  })
}
