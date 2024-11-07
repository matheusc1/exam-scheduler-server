import type { createOperatingHoursRequest } from './create-operating-hours'
import { supportCenterOperatingHours } from '../../db/schema'
import { updateRecords } from '../db-utils/update-records'

interface updateOperatingHoursRequest extends createOperatingHoursRequest {
  id: string
}

export async function updateOperatingHours({
  id,
  supportCenter,
  weekDay,
  openTime,
  closeTime,
}: updateOperatingHoursRequest) {
  await updateRecords(
    supportCenterOperatingHours,
    { supportCenter, weekDay, openTime, closeTime },
    supportCenterOperatingHours.id,
    id
  )
}
