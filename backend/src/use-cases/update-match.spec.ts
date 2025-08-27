import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryMatchesRepository } from 'backend/src/repositories/in-memory/in-memory-matches-repository'
import { UpdateMatchUseCase } from './update-match'
import { randomUUID } from 'node:crypto'

let matchRepository: InMemoryMatchesRepository
let sut: UpdateMatchUseCase

describe('Update Match Use Case', () => {
  beforeEach(() => {
    matchRepository = new InMemoryMatchesRepository()
    sut = new UpdateMatchUseCase(matchRepository)
  })

  it('Update Match Use Case', async () => {
    // Cria partida fake
    const match = await matchRepository.create({
      id: randomUUID(),
      tournament_id: 'tournament-1',
      category_id: 'category-01',
      group_id: 'A',
      team1_id: 'team-1',
      team2_id: 'team-2',
      score_team1: null,
      score_team2: null,
      court_id: null,
      start_time: null,
      round: null,
    })

    // atualiza placar
    const { match: updatedMatch } = await sut.execute({
      matchId: match.id,
      score_team1: 18,
      score_team2: 14,
    })

    expect(updatedMatch.score_team1).toEqual(18)
    expect(updatedMatch.score_team2).toEqual(14)
  })

  it('should not be able to update a non-exisiting match', async () => {
    await expect(() =>
      sut.execute({
        matchId: 'non-existing-id',
        score_team1: 18,
        score_team2: 14,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
