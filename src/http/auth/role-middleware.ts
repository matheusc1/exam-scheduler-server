import type { FastifyRequest, FastifyReply } from 'fastify'

export const roleMiddleware = (allowedRoles: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!allowedRoles.includes(request.user.role)) {
      reply.status(403).send({ message: 'Acesso negado' })
    }
  }
}
