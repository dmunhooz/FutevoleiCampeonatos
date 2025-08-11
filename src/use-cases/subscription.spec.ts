import { InMemorySubscriptionRepository } from '@/repositories/in-memory/in-memory-subscriptions-repository'
import { SubscriptionUseCase } from './subscription'
import { beforeEach, describe, expect, it } from 'vitest'

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
      tournamentId: 'tournament-01',
      category_id: 'category-01',
    })

    expect(subscription.id).toEqual(expect.any(String))
  })
})
