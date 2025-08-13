import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchTournamentsUseCase } from '@/use-cases/factories/make-search-tournament-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchTournamentsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchTournamentsQuerySchema.parse(request.query)

  const searchTournamentsUseCase = makeSearchTournamentsUseCase()

  const { tournaments } = await searchTournamentsUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({
    tournaments,
  })
}
