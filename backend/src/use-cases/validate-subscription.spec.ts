import { InMemorySubscriptionRepository } from 'src/repositories/in-memory/in-memory-subscriptions-repository'
import { PaymentStatus } from '@prisma/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { ValidateSubscriptionUseCase } from './validate-subscription'
import { PaymentNotConfirmedError } from './errors/payment-not-confirmed-error'

let subscriptionsRepository: InMemorySubscriptionRepository
let sut: ValidateSubscriptionUseCase

describe('Validate Subscription Use Case', () => {
  beforeEach(async () => {
    subscriptionsRepository = new InMemorySubscriptionRepository()
    sut = new ValidateSubscriptionUseCase(subscriptionsRepository)
  })

  it('should validate subscription only if payment is confirmed', async () => {
    const createdSubscription = await subscriptionsRepository.create({
      tournament_id: 'tournament-1',
      player1_id: 'player-1',
      player2_id: 'player-2',
      category_id: 'category-1',
      payment_status: PaymentStatus.CONFIRMED,
    })
    const { subscription } = await sut.execute({
      subscriptionId: createdSubscription.id,
    })

    expect(subscription.validated_at).toEqual(expect.any(Date))
    expect(subscription.payment_status).toEqual(PaymentStatus.CONFIRMED)
  })

  it('should not validate subscription if payment is PENDING', async () => {
    const createdSubscription = await subscriptionsRepository.create({
      tournament_id: 'tournament-1',
      player1_id: 'player-1',
      player2_id: 'player-2',
      category_id: 'category-1',
      payment_status: PaymentStatus.PENDING,
    })
    await expect(() =>
      sut.execute({ subscriptionId: createdSubscription.id }),
    ).rejects.toBeInstanceOf(PaymentNotConfirmedError)
  })
})
