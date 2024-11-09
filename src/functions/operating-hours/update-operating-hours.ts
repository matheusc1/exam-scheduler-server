import { supportCenterOperatingHours } from '../../db/schema'
import { updateRecords } from '../db-utils/update-records'

interface UpdateOperatingHoursRequest {
  id: string
  supportCenter: string
  weekDay: number
  openTime: string
  closeTime: string
}

export async function updateOperatingHours({
  id,
  supportCenter,
  weekDay,
  openTime,
  closeTime,
}: UpdateOperatingHoursRequest) {
  await updateRecords(
    supportCenterOperatingHours,
    { supportCenter, weekDay, openTime, closeTime },
    supportCenterOperatingHours.id,
    id
  )
}
