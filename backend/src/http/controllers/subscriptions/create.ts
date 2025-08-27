import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSubscriptionUseCase } from 'backend/src/use-cases/factories/make-subscription-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSubscriptionBodySchema = z.object({
    tournamentId: z.string().uuid(),
    categoryId: z.string().uuid(),
    partnerId: z.string().uuid(),
  })

  const { tournamentId, categoryId, partnerId } =
    createSubscriptionBodySchema.parse(request.body)

  const subscriptionUseCase = makeSubscriptionUseCase()

  await subscriptionUseCase.execute({
    tournament_id: tournamentId,
    user1_id: request.user.sub,
    user2_id: partnerId,
    category_id: categoryId,
  })

  return reply.status(201).send()
}
