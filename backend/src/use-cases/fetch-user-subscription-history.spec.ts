import { InMemorySubscriptionRepository } from 'src/repositories/in-memory/in-memory-subscriptions-repository'
import { FetchUserSubscriptionHistoryUseCase } from './fetch-user-subscription-history'
import { describe } from 'node:test'
import { beforeEach, expect, it } from 'vitest'

let subscriptionRepository: InMemorySubscriptionRepository
let sut: FetchUserSubscriptionHistoryUseCase

describe('Fetch User Subscription History Use Case', () => {
  beforeEach(async () => {
    subscriptionRepository = new InMemorySubscriptionRepository()
    sut = new FetchUserSubscriptionHistoryUseCase(subscriptionRepository)
  })

  it('should be able to fetch subscription history', async () => {
    await subscriptionRepository.create({
      id: 'subscription-01',
      player1_id: 'player-01',
      player2_id: 'player-02',
      tournament_id: 'Tournament 1',
      category_id: 'category-01',
      created_at: new Date(),
    })

    await subscriptionRepository.create({
      id: 'subscription-01',
      player1_id: 'player-01',
      player2_id: 'player-03',
      tournament_id: 'Tournament 2',
      category_id: 'category-01',
      created_at: new Date(),
    })
    const { subscriptions } = await sut.execute({
      user_id: 'player-01',
      page: 1,
    })

    expect(subscriptions).toHaveLength(2)
    expect(subscriptions).toEqual([
      expect.objectContaining({ tournament_id: 'Tournament 1' }),
      expect.objectContaining({ tournament_id: 'Tournament 2' }),
    ])
  })

  it('should be able to fetch paginated subscription history', async () => {
    for (let i = 1; i <= 22; i++) {
      await subscriptionRepository.create({
        id: `subscription-0${i}`,
        player1_id: 'player-01',
        player2_id: `player-0${i + 1}`,
        tournament_id: `Tournament ${i}`,
        category_id: 'category-01',
      })
    }

    const { subscriptions } = await sut.execute({
      user_id: 'player-01',
      page: 2,
    })

    expect(subscriptions).toHaveLength(2)
    expect(subscriptions).toEqual([
      expect.objectContaining({ tournament_id: 'Tournament 21' }),
      expect.objectContaining({ tournament_id: 'Tournament 22' }),
    ])
  })
})
