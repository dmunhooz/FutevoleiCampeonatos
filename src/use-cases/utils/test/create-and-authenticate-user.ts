import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
    phone: '111111111111',
  })
  console.log('User created')

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })
  console.log('Response:', authResponse.statusCode, authResponse.body)

  const { token } = authResponse.body
  console.log('Token obtained:', token)

  return {
    token,
  }
}
