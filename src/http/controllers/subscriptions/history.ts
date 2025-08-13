import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserSubscriptionsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-subscriptions-history-use-case'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const subscriptionHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = subscriptionHistoryQuerySchema.parse(request.query)

  const fetchUserSubscriptionsHistoryUseCase =
    makeFetchUserSubscriptionsHistoryUseCase()

  const { subscriptions } = await fetchUserSubscriptionsHistoryUseCase.execute({
    user_id: request.user.sub,
    page,
  })

  return reply.status(200).send({ subscriptions })
}
