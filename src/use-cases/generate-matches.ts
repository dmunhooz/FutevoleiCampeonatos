import { MatchRepository } from '@/repositories/matches-repository'
import { randomUUID } from 'node:crypto'

interface GenerateMatchesUseCaseRequest {
  groupId: string
  tournamentId: string
  categoryId: string
  teamIds: string[]
}

export class GenerateMatchesUseCase {
  constructor(private matchRepository: MatchRepository) {}

  async execute({
    groupId,
    tournamentId,
    categoryId,
    teamIds,
  }: GenerateMatchesUseCaseRequest) {
    const matches = []

    for (let i = 0; i < teamIds.length; i++) {
      for (let j = i + 1; j < teamIds.length; j++) {
        const match = await this.matchRepository.create({
          id: randomUUID(),
          group_id: groupId,
          tournament_id: tournamentId,
          category_id: categoryId,
          team1_id: teamIds[i] ?? null,
          team2_id: teamIds[j] ?? null,
          score_team1: null,
          score_team2: null,
          court_id: null,
          start_time: null,
          round: null, // pode definir fase se necessário
        })
        matches.push(match)
      }
    }

    return { matches }
  }
}
