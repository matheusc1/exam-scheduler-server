import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createOperatingHours } from '../../functions/operating-hours/create-operating-hours'
import { deleteOperatingHours } from '../../functions/operating-hours/delete-operating-hours'
import { getOperatingHours } from '../../functions/operating-hours/get-operating-hours'
import { updateOperatingHours } from '../../functions/operating-hours/update-operating-hours'

export const operatingHoursRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/support-center/:id/operating-hours',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          weekDays: z.number().min(1).max(6).array(),
          openTime: z.string(),
          closeTime: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params
      const { weekDays, openTime, closeTime } = request.body

      await createOperatingHours({
        supportCenter: id,
        weekDays,
        openTime,
        closeTime,
      })
    }
  )

  app.delete(
    '/support-center/:supportCenterId/operating-hours/:operatingHoursId',
    {
      schema: {
        params: z.object({
          supportCenterId: z.string(),
          operatingHoursId: z.string(),
        }),
      },
    },
    async request => {
      const { supportCenterId, operatingHoursId } = request.params

      await deleteOperatingHours({ operatingHoursId, supportCenterId })
    }
  )

  app.get(
    '/support-center/:id/operating-hours',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params
      const { operatingHours } = await getOperatingHours(id)

      return { operatingHours }
    }
  )

  app.put(
    '/support-center/:supportCenterId/operating-hours/:operatingHoursId',
    {
      schema: {
        params: z.object({
          supportCenterId: z.string(),
          operatingHoursId: z.string(),
        }),
        body: z.object({
          weekDay: z.number().min(1).max(6),
          openTime: z.string(),
          closeTime: z.string(),
        }),
      },
    },
    async request => {
      const { supportCenterId, operatingHoursId } = request.params
      const { weekDay, openTime, closeTime } = request.body

      await updateOperatingHours({
        id: operatingHoursId,
        supportCenter: supportCenterId,
        weekDay,
        openTime,
        closeTime,
      })
    }
  )
}
