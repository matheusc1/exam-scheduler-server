import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z, { date } from 'zod'
import dayjs from 'dayjs'
import { createAvailableSlots } from '../../functions/available-slots/create-available-slots'
import {
  deleteAllAvailableSlots,
  deleteAvailableSlots,
} from '../../functions/available-slots/delete-available-slots'
import { getAvailableSlots } from '../../functions/available-slots/get-available-slots'
import { updateAvailableSlots } from '../../functions/available-slots/update-available-slots'
import { getAvailableDates } from '../../functions/available-slots/get-available-dates'

export const availableSlotsRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/support-center/:supportCenterId/available-slots',
    {
      schema: {
        params: z.object({
          supportCenterId: z.string(),
        }),
        body: z.object({
          startDate: z.string().refine(date => dayjs(date).isValid(), {
            message: 'Data inicial inválida',
          }),
          endDate: z.string().refine(date => dayjs(date).isValid(), {
            message: 'Data final inválida',
          }),
          weekDays: z.number().array(),
        }),
      },
    },
    async request => {
      const { supportCenterId } = request.params
      const { startDate, endDate, weekDays } = request.body

      console.log(supportCenterId)

      await createAvailableSlots({
        supportCenterId,
        startDate: dayjs(startDate),
        endDate: dayjs(endDate),
        weekDays,
      })
    }
  )

  app.delete('/support-center/available-slots', async () => {
    await deleteAllAvailableSlots()
  })

  app.delete(
    '/support-center/:supportCenterId/available-slots',
    {
      schema: {
        params: z.object({
          supportCenterId: z.string(),
        }),
        query: z.object({
          date: z.string().refine(date => dayjs(date).isValid(), {
            message: 'Data inválida',
          }),
        }),
      },
    },
    async request => {
      const { supportCenterId } = request.params
      const { date } = request.query as { date: string }

      await deleteAvailableSlots({
        supportCenterId,
        selectedDate: dayjs(date),
      })
    }
  )

  app.get(
    '/support-center/:supportCenterId/available-slots',
    {
      schema: {
        params: z.object({
          supportCenterId: z.string(),
        }),
        query: z.object({
          date: z.string().refine(date => dayjs(date).isValid(), {
            message: 'Data inválida',
          }),
        }),
      },
    },
    async request => {
      const { supportCenterId } = request.params
      const { date } = request.query as { date: string }

      const slots = await getAvailableSlots({
        selectedDate: dayjs(date),
        supportCenterId,
      })

      return { slots }
    }
  )

  app.get(
    '/support-center/:supportCenterId/available-dates',
    {
      schema: {
        params: z.object({
          supportCenterId: z.string(),
        }),
      },
    },
    async request => {
      const { supportCenterId } = request.params
      const availableDates = await getAvailableDates({ supportCenterId })

      return { availableDates }
    }
  )

  app.put(
    '/support-center/:supportCenterId/available-slots',
    {
      schema: {
        params: z.object({
          supportCenterId: z.string(),
        }),
        query: z.object({
          date: z.string().refine(date => dayjs(date).isValid(), {
            message: 'Data inválida',
          }),
          time: z.string(),
        }),
        body: z.object({
          slots: z.number(),
        }),
      },
    },
    async request => {
      const { supportCenterId } = request.params
      const { date, time } = request.query as { date: string; time: string }
      const { slots } = request.body

      await updateAvailableSlots({
        supportCenterId,
        date: dayjs(date),
        time,
        slots,
      })
    }
  )
}
