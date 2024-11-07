import type { CreateOperatingHoursRequest } from './create-operating-hours'
import { supportCenterOperatingHours } from '../../db/schema'
import { updateRecords } from '../db-utils/update-records'

interface UpdateOperatingHoursRequest extends CreateOperatingHoursRequest {
  id: string
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
