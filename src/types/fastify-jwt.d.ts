import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      id: string
      role: string
    }
    user: {
      id: string
      role: string
    }
  }
}
