import { db } from '../../db'
import { supportCenter, supportCenterOperatingHours } from '../../db/schema'
import { eq } from 'drizzle-orm'

export async function getOperatingHours(supportCenterId: string) {
  const operatingHours = await db
    .select({
      id: supportCenterOperatingHours.id,
      supportCenter: supportCenter.name,
      weekDay: supportCenterOperatingHours.weekDay,
      openTime: supportCenterOperatingHours.openTime,
      closeTime: supportCenterOperatingHours.closeTime,
    })
    .from(supportCenterOperatingHours)
    .innerJoin(
      supportCenter,
      eq(supportCenter.id, supportCenterOperatingHours.supportCenter)
    )
    .where(eq(supportCenterOperatingHours.supportCenter, supportCenterId))

  return {
    operatingHours,
  }
}
