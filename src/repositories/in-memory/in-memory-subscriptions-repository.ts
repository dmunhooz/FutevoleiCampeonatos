import { PaymentStatus, Prisma, Subscription } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { SubscriptionRepository } from '../subscriptions-repository'

export class InMemorySubscriptionRepository implements SubscriptionRepository {
  public items: Subscription[] = []

  async create(data: Prisma.SubscriptionUncheckedCreateInput) {
    const subscription = {
      id: randomUUID(),
      player1_id: data.player1_id,
      player2_id: data.player2_id ?? null,
      partner_name: data.partner_name ?? null,
      tournament_id: data.tournament_id,
      category_id: data.category_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      payment_status: data.payment_status ?? PaymentStatus.PENDING,
      created_at: new Date(),
    }

    this.items.push(subscription)

    return subscription
  }
}
