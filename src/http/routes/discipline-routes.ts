import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createDiscipline } from '../../functions/discipline/create-discipline'
import { deleteDiscipline } from '../../functions/discipline/delete-discipline'
import { getDisciplines } from '../../functions/discipline/get-discipline'
import { updateDiscipline } from '../../functions/discipline/update-discipline'

export const disciplineRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/discipline',
    {
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

  app.get('/discipline', async () => {
    const { disciplines } = await getDisciplines()

    return { disciplines }
  })

  app.put(
    '/discipline/:id',
    {
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
