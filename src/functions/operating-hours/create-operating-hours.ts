import { db } from '../../db'
import { supportCenterOperatingHours } from '../../db/schema'

export interface CreateOperatingHoursRequest {
  supportCenter: string
  weekDays: number[]
  openTime: string
  closeTime: string
}

export async function createOperatingHours({
  supportCenter,
  weekDays,
  openTime,
  closeTime,
}: CreateOperatingHoursRequest) {
  const records = weekDays.map(weekDay => ({
    supportCenter,
    weekDay,
    openTime,
    closeTime,
  }))

  await db.insert(supportCenterOperatingHours).values(records)
}
