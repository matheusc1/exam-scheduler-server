import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'

import { supportCenterRoutes } from './routes/supportCenterRoutes'
import { operatingHoursRoute } from './routes/operatingHoursRoutes'
import { availableSlotsRoutes } from './routes/availableSlotsRoutes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  // origin: /localhost\:5173/,
  origin: '*',
  credentials: true,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(supportCenterRoutes)
app.register(operatingHoursRoute)
app.register(availableSlotsRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})
