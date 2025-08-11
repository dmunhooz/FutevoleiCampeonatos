import { InMemorySubscriptionRepository } from '@/repositories/in-memory/in-memory-subscriptions-repository'
import { SubscriptionUseCase } from './subscription'
import { beforeEach, describe, expect, it } from 'vitest'
import { DuoAlreadyRegisteredError } from './errors/duo-already-registered-category'

let subscriptionRepository: InMemorySubscriptionRepository
let sut: SubscriptionUseCase

describe('Subscription Use Case', () => {
  beforeEach(() => {
    subscriptionRepository = new InMemorySubscriptionRepository()
    sut = new SubscriptionUseCase(subscriptionRepository)
  })
  it('should be able to create a subscription', async () => {
    const { subscription } = await sut.execute({
      user1_id: 'player-01',
      user2_id: 'player-02',
      tournament_id: 'tournament-01',
      category_id: 'category-01',
    })

    expect(subscription.id).toEqual(expect.any(String))
  })

  it('should not be able to subscribe to the same tournament twice', async () => {
    await sut.execute({
      user1_id: 'player-01',
      user2_id: 'player-02',
      tournament_id: 'tournament-01',
      category_id: 'category-01',
    })

    await expect(() =>
      sut.execute({
        user1_id: 'player-01',
        user2_id: 'player-02',
        tournament_id: 'tournament-01',
        category_id: 'category-01',
      }),
    ).rejects.toBeInstanceOf(DuoAlreadyRegisteredError)
  })

  it('should allow subscribing to the same tournament with the same duo but in different categories', async () => {
    await sut.execute({
      user1_id: 'player-01',
      user2_id: 'player-02',
      tournament_id: 'tournament-01',
      category_id: 'category-01',
    })

    const { subscription } = await sut.execute({
      user1_id: 'player-01',
      user2_id: 'player-02',
      tournament_id: 'tournament-01',
      category_id: 'category-02',
    })

    expect(subscription.id).toEqual(expect.any(String))
  })
})
