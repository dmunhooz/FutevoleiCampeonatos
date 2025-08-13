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
    creator_id: z.string(),
  })
  const { title, description, phone, location, state, city, creator_id } =
    createTournamentBodySchema.parse(request.body)

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
