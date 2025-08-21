import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { search } from './search'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function tournamentsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/tournaments/search', search)
  app.post('/tournaments', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
