import { FastifyInstance } from 'fastify'
import { updateMatch } from 'src/http/controllers/matches/update-match'
import { verifyUserRole } from 'src/http/middlewares/verify-user-role'
import { verifyJWT } from 'src/http/middlewares/verify-jwt'

export async function matchesRoutes(app: FastifyInstance) {
  app.put(
    '/matches/:matchId',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    updateMatch,
  )
}
