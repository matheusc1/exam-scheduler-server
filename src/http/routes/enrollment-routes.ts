import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createEnrollment } from '../../functions/enrollment/create-enrollment'
import { deleteEnrollment } from '../../functions/enrollment/delete-enrollment'
import { updateEnrollment } from '../../functions/enrollment/update-enrollment'
import { getEnrollments } from '../../functions/enrollment/get-enrollment'
import { getEnrollmentByStudentRa } from '../../functions/enrollment/get-enrollment-by-student-id'
import { authMiddleware } from '../auth/auth-middleware'
import { roleMiddleware } from '../auth/role-middleware'

export const enrollmentRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/enrollment',
    {
      preHandler: [authMiddleware, roleMiddleware(['admin'])],
      schema: {
        body: z.object({
          studentRa: z.string().array(),
          disciplineId: z.string(),
          periodId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        await createEnrollment(request.body)
        reply.code(201).send({ message: 'Alunos matriculados com sucesso!' })
      } catch (error) {
        reply.code(500).send({ error: 'Erro ao matricular alunos.' })
      }
    }
  )

  app.delete(
    '/enrollment/:id',
    {
      preHandler: [authMiddleware, roleMiddleware(['admin'])],
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async request => {
      await deleteEnrollment({ id: request.params.id })
    }
  )

  app.put(
    '/enrollment/:id',
    {
      preHandler: [authMiddleware, roleMiddleware(['admin'])],
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          studentRa: z.string(),
          disciplineId: z.string(),
          periodId: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params
      const { studentRa, disciplineId, periodId } = request.body

      await updateEnrollment({
        id,
        studentRa,
        disciplineId,
        periodId,
      })
    }
  )

  app.get(
    '/enrollment',
    { preHandler: [authMiddleware, roleMiddleware(['admin'])] },
    async () => {
      const { enrollments } = await getEnrollments()
      return { enrollments }
    }
  )

  app.get(
    '/enrollment/:studentRa',
    {
      preHandler: [authMiddleware, roleMiddleware(['student'])],
      schema: {
        params: z.object({
          studentRa: z.string(),
        }),
      },
    },
    async request => {
      const { studentRa } = request.params

      const enrollments = await getEnrollmentByStudentRa({ studentRa })
      return { enrollments }
    }
  )
}
