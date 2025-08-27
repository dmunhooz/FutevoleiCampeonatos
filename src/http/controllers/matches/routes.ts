import { FastifyInstance } from 'fastify'
import { updateMatch } from '@/http/controllers/matches/update-match'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function matchesRoutes(app: FastifyInstance) {
  app.put(
    '/matches/:matchId',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    updateMatch,
  )
}
