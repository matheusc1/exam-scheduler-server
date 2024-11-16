import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createDiscipline } from '../../functions/discipline/create-discipline'
import { deleteDiscipline } from '../../functions/discipline/delete-discipline'
import { getDisciplines } from '../../functions/discipline/get-discipline'
import { updateDiscipline } from '../../functions/discipline/update-discipline'
import { authMiddleware } from '../auth/auth-middleware'
import { roleMiddleware } from '../auth/role-middleware'

export const disciplineRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/discipline',
    {
      preHandler: [authMiddleware, roleMiddleware(['admin'])],
      schema: {
        body: z.object({
          name: z.string(),
        }),
      },
    },
    async request => {
      const { name } = request.body

      await createDiscipline({
        name,
      })
    }
  )

  app.delete(
    '/discipline/:id',
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

      await deleteDiscipline({ id })
    }
  )

  app.get(
    '/discipline',
    { preHandler: [authMiddleware, roleMiddleware(['admin'])] },
    async () => {
      const { disciplines } = await getDisciplines()

      return { disciplines }
    }
  )

  app.put(
    '/discipline/:id',
    {
      preHandler: [authMiddleware, roleMiddleware(['admin'])],
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          name: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params
      const { name } = request.body

      await updateDiscipline({
        id,
        name,
      })
    }
  )
}
