import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import dayjs from 'dayjs'
import { createPeriod } from '../../functions/period/create-period'
import { deletePeriod } from '../../functions/period/delete-period'
import { getPeriods } from '../../functions/period/get-period'
import { updatePeriod } from '../../functions/period/update-period'

export const periodRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/period',
    {
      schema: {
        body: z.object({
          startDate: z.string().refine(date => dayjs(date).isValid(), {
            message: 'Data inválida',
          }),
          endDate: z.string().refine(date => dayjs(date).isValid(), {
            message: 'Data inválida',
          }),
        }),
      },
    },
    async request => {
      const { startDate, endDate } = request.body

      await createPeriod({
        startDate: dayjs(startDate),
        endDate: dayjs(endDate),
      })
    }
  )

  app.delete(
    '/period/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params

      await deletePeriod({ id })
    }
  )

  app.get('/period', async () => {
    const { periods } = await getPeriods()

    return { periods }
  })

  app.put(
    '/period/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          startDate: z.string().refine(date => dayjs(date).isValid(), {
            message: 'Data inválida',
          }),
          endDate: z.string().refine(date => dayjs(date).isValid(), {
            message: 'Data inválida',
          }),
        }),
      },
    },
    async request => {
      const { id } = request.params
      const { startDate, endDate } = request.body

      await updatePeriod({
        id,
        startDate: dayjs(startDate),
        endDate: dayjs(endDate),
      })
    }
  )
}
