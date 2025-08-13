import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSubscriptionUseCase } from '@/use-cases/factories/make-subscription-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSubscriptionParamsSchema = z.object({
    tournamentId: z.string().uuid(),
    category: z.string().uuid(),
  })
  const createSubscriptionBodySchema = z.object({
    partnerId: z.string().uuid(),
  })

  const { tournamentId, category } = createSubscriptionParamsSchema.parse(
    request.params,
  )
  const { partnerId } = createSubscriptionBodySchema.parse(request.body)

  const subscriptionUseCase = makeSubscriptionUseCase()

  await subscriptionUseCase.execute({
    tournament_id: tournamentId,
    user1_id: request.user.sub,
    user2_id: partnerId,
    category_id: category,
  })

  return reply.status(201).send()
}
