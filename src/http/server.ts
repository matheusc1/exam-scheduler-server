import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import dotenv from 'dotenv'

import { authentication } from './auth/authentication'
import { supportCenterRoutes } from './routes/support-center-routes'
import { operatingHoursRoute } from './routes/operating-hours-routes'
import { availableSlotsRoutes } from './routes/available-slots-routes'
import { periodRoutes } from './routes/period-routes'
import { disciplineRoutes } from './routes/discipline-routes'
import { studentsRoutes } from './routes/students-routes'
import { enrollmentRoutes } from './routes/enrollment-routes'
import { scheduleRoutes } from './routes/schedule-routes'

dotenv.config()

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || '',
  verify: {
    extractToken: request => {
      return request.cookies.auth
    },
  },
})

app.register(fastifyCookie, {
  secret: process.env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: /localhost\:5173/,
  credentials: true,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(authentication)
app.register(supportCenterRoutes)
app.register(operatingHoursRoute)
app.register(availableSlotsRoutes)
app.register(periodRoutes)
app.register(disciplineRoutes)
app.register(studentsRoutes)
app.register(enrollmentRoutes)
app.register(scheduleRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})
