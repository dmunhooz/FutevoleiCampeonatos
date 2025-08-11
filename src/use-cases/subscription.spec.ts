import { InMemorySubscriptionRepository } from '@/repositories/in-memory/in-memory-subscriptions-repository'
import { SubscriptionUseCase } from './subscription'
import { beforeEach, describe, expect, it } from 'vitest'
import { DuoAlreadyRegisteredError } from './errors/duo-already-registered-category'
import { InMemoryTournamentsRepository } from '@/repositories/in-memory/in-memory-tournaments-repository'

let subscriptionRepository: InMemorySubscriptionRepository
let tournamentRepository: InMemoryTournamentsRepository
let sut: SubscriptionUseCase

describe('Subscription Use Case', () => {
  beforeEach(() => {
    subscriptionRepository = new InMemorySubscriptionRepository()
    tournamentRepository = new InMemoryTournamentsRepository()
    sut = new SubscriptionUseCase(subscriptionRepository, tournamentRepository)
    // Create tournament
    tournamentRepository.create({
      id: 'Tournament 1',
      title: 'Tournament 1',
      description: 'Description 1',
      phone: '123456789',
      location: 'Location 1',
      state: 'State 1',
      city: 'City 1',
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
      created_at: new Date(),
      updated_at: new Date(),
    })
  })
  it('should be able to create a subscription', async () => {
    const { subscription } = await sut.execute({
      user1_id: 'player-01',
      user2_id: 'player-02',
      tournament_id: 'Tournament 1',
      category_id: 'category-01',
    })

    expect(subscription.id).toEqual(expect.any(String))
  })

  it('should not be able to subscribe to the same tournament twice', async () => {
    await sut.execute({
      user1_id: 'player-01',
      user2_id: 'player-02',
      tournament_id: 'Tournament 1',
      category_id: 'category-01',
    })

    await expect(() =>
      sut.execute({
        user1_id: 'player-01',
        user2_id: 'player-02',
        tournament_id: 'Tournament 1',
        category_id: 'category-01',
      }),
    ).rejects.toBeInstanceOf(DuoAlreadyRegisteredError)
  })

  it('should allow subscribing to the same tournament with the same duo but in different categories', async () => {
    await sut.execute({
      user1_id: 'player-01',
      user2_id: 'player-02',
      tournament_id: 'Tournament 1',
      category_id: 'category-01',
    })

    const { subscription } = await sut.execute({
      user1_id: 'player-01',
      user2_id: 'player-02',
      tournament_id: 'Tournament 1',
      category_id: 'category-02',
    })

    expect(subscription.id).toEqual(expect.any(String))
  })
})
