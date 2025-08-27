import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateSubscriptionUseCase } from 'src/use-cases/factories/make-validate-subscription-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const makeValidateSubscriptionParamsSchema = z.object({
    subscriptionId: z.string().uuid(),
  })

  const { subscriptionId } = makeValidateSubscriptionParamsSchema.parse(
    request.params,
  )

  const validateSubscriptionUseCase = makeValidateSubscriptionUseCase()

  await validateSubscriptionUseCase.execute({
    subscriptionId,
  })

  return reply.status(200).send()
}
