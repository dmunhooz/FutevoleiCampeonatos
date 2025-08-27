import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchTournamentsUseCase } from 'backend/src/use-cases/factories/make-search-tournament-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchTournamentsQuerySchema = z.object({
    title: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { title, page } = searchTournamentsQuerySchema.parse(request.query)

  const searchTournamentsUseCase = makeSearchTournamentsUseCase()

  const { tournaments } = await searchTournamentsUseCase.execute({
    title,
    page,
  })

  return reply.status(200).send({
    tournaments,
  })
}
