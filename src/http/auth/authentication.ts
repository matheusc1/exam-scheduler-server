import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import argon2 from 'argon2'
import { findUserByEmail } from '../../utils/findUserByEmail'

export const authentication: FastifyPluginAsyncZod = async app => {
  app.post(
    '/login',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const user = await findUserByEmail(email)
      if (!user) {
        return reply
          .status(401)
          .send({ message: 'Usuário ou senha incorretos' })
      }

      const isPasswordValid = await argon2.verify(user.password, password)
      if (!isPasswordValid) {
        return reply
          .status(401)
          .send({ message: 'Usuário ou senha incorretos' })
      }

      if (!user.id) {
        return reply
          .status(500)
          .send({ message: 'Erro interno: ID do usuário não encontrado' })
      }

      const token = app.jwt.sign(
        { id: user.id, role: user.role },
        { expiresIn: '24h' }
      )

      reply.setCookie('auth', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      })

      return reply.send({
        message: 'Login bem-sucedido',
        role: user.role,
        id: user.id,
      })
    }
  )

  app.post('/logout', async (request, reply) => {
    reply.clearCookie('auth', {
      path: '/',
    })

    return reply.send({ message: 'Logout realizado com sucesso' })
  })

  app.get('/verify-token', async (request, reply) => {
    try {
      const token = request.cookies.auth

      if (!token) {
        return reply.status(401).send({ message: 'Token não fornecido' })
      }

      const decoded = app.jwt.verify(token)
      return reply.send({ message: 'Token válido', user: decoded })
    } catch (err) {
      return reply.status(401).send({ message: 'Token inválido ou expirado' })
    }
  })
}
