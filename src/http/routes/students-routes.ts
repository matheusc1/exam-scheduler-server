import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import dayjs from 'dayjs'
import {
  type CreateStudentRequest,
  createStudents,
} from '../../functions/student/create-student'
import { deleteStudent } from '../../functions/student/delete-student'
import {
  getStudentById,
  getStudents,
} from '../../functions/student/get-student'
import { updateStudent } from '../../functions/student/update-student'

const studentSchema = z.object({
  ra: z.string(),
  name: z.string(),
  email: z.string().email(),
  birthDate: z
    .string()
    .refine(date => dayjs(date, 'YYYY-MM-DD', true).isValid(), {
      message: 'Invalid date format, expected YYYY-MM-DD',
    }),
  supportCenter: z.string(),
})

const studentsSchema = z.array(studentSchema)

export const studentsRoutes: FastifyPluginAsyncZod = async app => {
  app.post(
    '/students',
    {
      schema: {
        body: studentsSchema,
      },
    },
    async (request, reply) => {
      const students: CreateStudentRequest[] = request.body

      try {
        await createStudents(students)
        reply.code(201).send({ message: 'Alunos registrados com sucesso!' })
      } catch (error) {
        console.error('Erro ao registrar alunos:', error)
        reply.code(500).send({ error: 'Erro ao registrar alunos.' })
      }
    }
  )

  app.delete(
    '/students/:ra',
    {
      schema: {
        params: z.object({
          ra: z.string(),
        }),
      },
    },
    async request => {
      const { ra } = request.params

      await deleteStudent({ ra })
    }
  )

  app.get('/students', async () => {
    const { students } = await getStudents()

    return { students }
  })

  app.get(
    '/students/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params

      const student = await getStudentById({ id })
      return { student }
    }
  )

  app.put(
    '/students/:ra',
    {
      schema: {
        params: z.object({
          ra: z.string(),
        }),
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          supportCenter: z.string(),
        }),
      },
    },
    async request => {
      const { ra } = request.params
      const { name, email, supportCenter } = request.body

      await updateStudent({
        ra,
        name,
        email,
        supportCenter,
      })
    }
  )
}
