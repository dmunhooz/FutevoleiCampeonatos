import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaMatchesRepository } from 'src/repositories/prisma/prisma-matches-repository'
import { UpdateMatchUseCase } from 'src/use-cases/update-match'
import { ResourceNotFoundError } from 'src/use-cases/errors/resource-not-found-error'

export async function updateMatch(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateMatchParamsSchema = z.object({
    matchId: z.string().uuid(),
  })

  const updateMatchBodySchema = z.object({
    score_team1: z.number().nullable(),
    score_team2: z.number().nullable(),
  })

  const { matchId } = updateMatchParamsSchema.parse(request.params)
  const { score_team1, score_team2 } = updateMatchBodySchema.parse(request.body)

  try {
    const matchesRepository = new PrismaMatchesRepository()
    const updateMatchUseCase = new UpdateMatchUseCase(matchesRepository)

    const { match } = await updateMatchUseCase.execute({
      matchId,
      score_team1,
      score_team2,
    })

    return reply.status(200).send({ match })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Match not found.' })
    }
    throw err
  }
}
