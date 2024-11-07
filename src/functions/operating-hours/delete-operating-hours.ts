import { and, eq } from 'drizzle-orm'
import { db } from '../../db'
import { supportCenterOperatingHours } from '../../db/schema'

interface DeleteOperatingHoursRequest {
  supportCenterId: string
  operatingHoursId: string
}

export async function deleteOperatingHours({
  supportCenterId,
  operatingHoursId,
}: DeleteOperatingHoursRequest) {
  await db
    .delete(supportCenterOperatingHours)
    .where(
      and(
        eq(supportCenterOperatingHours.id, operatingHoursId),
        eq(supportCenterOperatingHours.supportCenter, supportCenterId)
      )
    )
}
