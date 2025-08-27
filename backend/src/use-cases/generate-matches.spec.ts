import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryMatchesRepository } from 'src/repositories/in-memory/in-memory-matches-repository'
import { GenerateMatchesUseCase } from './generate-matches'

let matchRepository: InMemoryMatchesRepository
let sut: GenerateMatchesUseCase

describe('Generate Matches Use Case', () => {
  beforeEach(() => {
    matchRepository = new InMemoryMatchesRepository()
    sut = new GenerateMatchesUseCase(matchRepository)
  })

  it('should generate all matches for a group', async () => {
    const groupId = 'group-1'
    const tournamentId = 'tournament-1'
    const categoryId = 'category-1'
    const teamIds = ['team-1', 'team-2', 'team-3', 'team-4']

    const { matches } = await sut.execute({
      groupId,
      tournamentId,
      categoryId,
      teamIds,
    })

    expect(matches).toHaveLength(6)
    expect(matches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ team1_id: 'team-1', team2_id: 'team-2' }),
        expect.objectContaining({ team1_id: 'team-1', team2_id: 'team-3' }),
        expect.objectContaining({ team1_id: 'team-1', team2_id: 'team-4' }),
        expect.objectContaining({ team1_id: 'team-2', team2_id: 'team-3' }),
      ]),
    )
  })
})
