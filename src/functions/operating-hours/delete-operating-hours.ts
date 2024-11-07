import { and, eq } from 'drizzle-orm'
import { db } from '../../db'
import { supportCenterOperatingHours } from '../../db/schema'

interface deleteOperatingHoursRequest {
  supportCenterId: string
  operatingHoursId: string
}

export async function deleteOperatingHours({
  supportCenterId,
  operatingHoursId,
}: deleteOperatingHoursRequest) {
  await db
    .delete(supportCenterOperatingHours)
    .where(
      and(
        eq(supportCenterOperatingHours.id, operatingHoursId),
        eq(supportCenterOperatingHours.supportCenter, supportCenterId)
      )
    )
}
