import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { history } from './history'
import { validate } from './validate'
import { create } from './create'

export async function subscriptionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/subscriptions/history', history)

  app.post('/subscriptions', create)

  app.patch('/subscriptions/:subscriptionId/validate', validate)
}
