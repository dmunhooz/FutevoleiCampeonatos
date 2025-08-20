import { InMemoryTournamentsRepository } from '@/repositories/in-memory/in-memory-tournaments-repository'
import { describe } from 'node:test'
import { beforeEach, expect, it } from 'vitest'
import { SearchTournamentsUseCase } from './search-tournaments'

let tournamentRepository: InMemoryTournamentsRepository
let sut: SearchTournamentsUseCase

describe('Search Tournaments Use Case', () => {
  beforeEach(async () => {
    tournamentRepository = new InMemoryTournamentsRepository()
    sut = new SearchTournamentsUseCase(tournamentRepository)
  })

  it('should be able to search for tournaments', async () => {
    await tournamentRepository.create({
      id: 'Tournament 1',
      title: 'Metropolitano',
      description: 'Description 1',
      phone: '123456789',
      location: 'Location 1',
      state: 'State 1',
      city: 'City 1',
      created_at: new Date(),
      updated_at: new Date(),
      Category: {
        connect: {
          id: 'category-01',
        },
      },
      creator: {
        connect: {
          id: 'creator-1',
        },
      },
    })
    await tournamentRepository.create({
      id: 'Tournament 2',
      title: 'Fusion',
      description: 'Description 2',
      phone: '123456789',
      location: 'Location 2',
      state: 'State 2',
      city: 'City 2',
      created_at: new Date(),
      updated_at: new Date(),
      Category: {
        connect: {
          id: 'category-02',
        },
      },
      creator: {
        connect: {
          id: 'creator-2',
        },
      },
    })

    const { tournaments } = await sut.execute({
      title: 'Metropolitano',
      page: 1,
    })

    expect(tournaments).toHaveLength(1)
    expect(tournaments).toEqual([
      expect.objectContaining({ title: 'Metropolitano' }),
    ])
  })

  it('should be able to fetch paginated tournaments search', async () => {
    for (let i = 1; i <= 22; i++) {
      await tournamentRepository.create({
        id: 'Tournament 1',
        title: `Metropolitano ${i}`,
        description: 'Description 1',
        phone: '123456789',
        location: 'Location 1',
        state: 'State 1',
        city: 'City 1',
        created_at: new Date(),
        updated_at: new Date(),
        Category: {
          connect: {
            id: 'category-01',
          },
        },
        creator: {
          connect: {
            id: 'creator-1',
          },
        },
      })
    }

    const { tournaments } = await sut.execute({
      title: 'Metropolitano',
      page: 2,
    })

    expect(tournaments).toHaveLength(2)
    expect(tournaments).toEqual([
      expect.objectContaining({ title: 'Metropolitano 21' }),
      expect.objectContaining({ title: 'Metropolitano 22' }),
    ])
  })

  it('should be able to search for tournaments in a specific city', async () => {
    await tournamentRepository.create({
      id: 'Tournament 1',
      title: 'Metropolitano',
      description: 'Description 1',
      phone: '123456789',
      location: 'Location 1',
      state: 'State 1',
      city: 'Canoas',
      created_at: new Date(),
      updated_at: new Date(),
      Category: {
        connect: {
          id: 'category-01',
        },
      },
      creator: {
        connect: {
          id: 'creator-1',
        },
      },
    })
    await tournamentRepository.create({
      id: 'Tournament 2',
      title: 'Fusion',
      description: 'Description 2',
      phone: '123456789',
      location: 'Location 2',
      state: 'State 2',
      city: 'Porto alegre',
      created_at: new Date(),
      updated_at: new Date(),
      Category: {
        connect: {
          id: 'category-02',
        },
      },
      creator: {
        connect: {
          id: 'creator-2',
        },
      },
    })

    const { tournaments } = await sut.execute({
      title: 'Canoas',
      page: 1,
    })

    expect(tournaments).toHaveLength(1)
    expect(tournaments).toEqual([expect.objectContaining({ city: 'Canoas' })])
  })
})
