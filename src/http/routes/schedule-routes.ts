import dayjs from 'dayjs'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createSchedule } from '../../functions/schedule/create-schedule'
import { getStudentSchedules } from '../../functions/schedule/get-student-schedule'
import { getAllSchedulesBySupportCenter } from '../../functions/schedule/get-schedules-by-support-center'
import { updateSchedule } from '../../functions/schedule/update-schedule'
import { authMiddleware } from '../auth/auth-middleware'
import { roleMiddleware } from '../auth/role-middleware'

export const scheduleRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/schedule',
    {
      preHandler: [authMiddleware, roleMiddleware(['student'])],
      schema: {
        body: z.object({
          enrollmentId: z.string(),
          type: z.enum(['mandatory', 'substitute']),
          scheduledDate: z.string().refine(date => dayjs(date).isValid(), {
            message: 'Data inválida',
          }),
        }),
      },
    },
    async request => {
      const { enrollmentId, type, scheduledDate } = request.body

      await createSchedule({
        enrollmentId,
        type,
        scheduledDate: dayjs(scheduledDate),
      })
    }
  )

  app.get(
    '/schedule',
    {
      preHandler: [authMiddleware, roleMiddleware(['student'])],
      schema: {
        querystring: z.object({
          q: z.string(),
        }),
      },
    },
    async request => {
      const { q } = request.query

      const schedules = await getStudentSchedules({ studentRa: q })

      return { schedules }
    }
  )

  app.get(
    '/schedule/support-center',
    {
      preHandler: [authMiddleware, roleMiddleware(['coordinator', 'admin'])],
      schema: {
        querystring: z.object({
          q: z.string(),
        }),
      },
    },
    async request => {
      const { q } = request.query
      const schedules = await getAllSchedulesBySupportCenter({
        supportCenterId: q,
      })
      return { schedules }
    }
  )

  app.put(
    '/schedule/:id',
    {
      preHandler: [authMiddleware, roleMiddleware(['student'])],
      schema: {
        body: z.object({
          newScheduledDate: z.string().refine(date => dayjs(date).isValid(), {
            message: 'Data inválida',
          }),
        }),
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params
      const { newScheduledDate } = request.body

      await updateSchedule({
        id,
        newScheduledDate: dayjs(newScheduledDate),
      })
    }
  )
}
