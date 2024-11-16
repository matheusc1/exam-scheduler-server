import type { FastifyReply, FastifyRequest } from 'fastify'

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply
      .status(401)
      .send({ message: 'Token inválido ou expirado', error: err })
  }
}
