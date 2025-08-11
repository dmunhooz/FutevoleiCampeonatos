import { InMemoryTournamentsRepository } from '@/repositories/in-memory/in-memory-tournaments-repository'
import { CreateTournamentUseCase } from './create-tournament'
import { describe } from 'node:test'
import { beforeEach, expect, it } from 'vitest'

let tournamentsRepository: InMemoryTournamentsRepository
let sut: CreateTournamentUseCase

describe('Create Tournament Use Case', () => {
  beforeEach(() => {
    tournamentsRepository = new InMemoryTournamentsRepository()
    sut = new CreateTournamentUseCase(tournamentsRepository)
  })
  it('should be able to create tournament', async () => {
    const { tournament } = await sut.execute({
      title: 'Tournament 1',
      description: 'Description 1',
      phone: '123456789',
      location: 'Location 1',
      creator_id: 'creator-1',
    })

    expect(tournament.id).toEqual(expect.any(String))
  })
})
