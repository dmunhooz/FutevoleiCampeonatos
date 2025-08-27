import { Match } from '@prisma/client'
import { MatchRepository } from '@/repositories/matches-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateMatchUseCaseRequest {
  matchId: string
  score_team1: number | null
  score_team2: number | null
}

interface UpdateMatchUseCaseResponse {
  match: Match
}

export class UpdateMatchUseCase {
  constructor(private matchRepository: MatchRepository) {}

  async execute({
    matchId,
    score_team1,
    score_team2,
  }: UpdateMatchUseCaseRequest): Promise<UpdateMatchUseCaseResponse> {
    const match = await this.matchRepository.findById(matchId)

    if (!match) {
      throw new ResourceNotFoundError()
    }

    const updatedMatch = await this.matchRepository.update(matchId, {
      score_team1,
      score_team2,
    })

    return {
      match: updatedMatch,
    }
  }
}
