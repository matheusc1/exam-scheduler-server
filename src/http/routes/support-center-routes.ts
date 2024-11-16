import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createSupportCenter } from '../../functions/support-center/create-support-center'
import { deleteSupportCenter } from '../../functions/support-center/delete-support-center'
import { getSupportCenters } from '../../functions/support-center/get-support-center'
import { updateSupportCenter } from '../../functions/support-center/update-support-center'
import { authMiddleware } from '../auth/auth-middleware'
import { roleMiddleware } from '../auth/role-middleware'

export const supportCenterRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/support-center',
    {
      preHandler: [authMiddleware, roleMiddleware(['admin'])],
      schema: {
        body: z.object({
          name: z.string(),
          numberOfComputers: z.number(),
        }),
      },
    },
    async request => {
      const { name, numberOfComputers } = request.body
      await createSupportCenter({ name, numberOfComputers })
    }
  )

  app.delete(
    '/support-center/:id',
    {
      preHandler: [authMiddleware, roleMiddleware(['admin'])],
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params
      await deleteSupportCenter({ id })
    }
  )

  app.get(
    '/support-center',
    { preHandler: [authMiddleware, roleMiddleware(['admin', 'coordinator'])] },
    async () => {
      const { supportCenters } = await getSupportCenters()
      return { supportCenters }
    }
  )

  app.put(
    '/support-center/:id',
    {
      preHandler: [authMiddleware, roleMiddleware(['admin'])],
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string(),
          numberOfComputers: z.number(),
        }),
      },
    },
    async request => {
      const { id } = request.params
      const { name, numberOfComputers } = request.body
      await updateSupportCenter({ id, name, numberOfComputers })
    }
  )
}
