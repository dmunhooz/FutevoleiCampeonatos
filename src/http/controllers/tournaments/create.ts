import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateTournamentUseCase } from '@/use-cases/factories/make-tournament-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTournamentBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    phone: z.string(),
    location: z.string(),
    state: z.string(),
    city: z.string(),
  })
  console.log('Request body:', request.body)

  const { title, description, phone, location, state, city } =
    createTournamentBodySchema.parse(request.body)

  const { sub: creator_id } = request.user

  const createTournamentUseCase = makeCreateTournamentUseCase()

  await createTournamentUseCase.execute({
    title,
    description,
    phone,
    location,
    state,
    city,
    creator_id,
  })

  return reply.status(201).send()
}
