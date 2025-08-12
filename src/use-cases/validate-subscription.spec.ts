import { InMemorySubscriptionRepository } from '@/repositories/in-memory/in-memory-subscriptions-repository'
import { PaymentStatus } from '@prisma/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { ValidateSubscriptionUseCase } from './validate-subscription'

let subscriptionsRepository: InMemorySubscriptionRepository
let sut: ValidateSubscriptionUseCase

describe('Validate Subscription Use Case', () => {
  beforeEach(async () => {
    subscriptionsRepository = new InMemorySubscriptionRepository()
    sut = new ValidateSubscriptionUseCase(subscriptionsRepository)
  })

  it('should be able to validate check-in', async () => {
    const CreatedSubscription = await subscriptionsRepository.create({
      tournament_id: 'tournament-1',
      player1_id: 'player-1',
      player2_id: 'player-2',
      category_id: 'category-1',
      payment_status: PaymentStatus.CONFIRMED,
    })
    const { subscription } = await sut.execute({
      subscriptionId: CreatedSubscription.id,
    })

    expect(subscription.validated_at).toEqual(expect.any(Date))
    expect(subscription.payment_status).toEqual(PaymentStatus.CONFIRMED)
  })
})
