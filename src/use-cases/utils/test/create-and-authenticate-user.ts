import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const email = `johndoe+${Date.now()}@example.com`

  await request(app.server).post('/users').send({
    name: 'John Doe',
    email,
    password: '123456',
    phone: '111111111111',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password: '123456',
  })

  const { token } = authResponse.body

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  })

  return {
    token,
    user,
  }
}
