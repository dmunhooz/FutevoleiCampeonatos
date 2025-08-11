import { PaymentStatus, Prisma, Subscription } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { SubscriptionRepository } from '../subscriptions-repository'

export class InMemorySubscriptionRepository implements SubscriptionRepository {
  public items: Subscription[] = []

  async findByDuoAndTournamentAndCategory(
    user1_id: string,
    user2_id: string,
    tournament_id: string,
    category_id: string,
  ): Promise<Subscription | null> {
    const subscription = this.items.find((item) => {
      const isSamePlayers =
        (item.player1_id === user1_id && item.player2_id === user2_id) ||
        (item.player1_id === user2_id && item.player2_id === user1_id)

      const isSameTournament = item.tournament_id === tournament_id
      const isSameCategory = item.category_id === category_id

      return isSamePlayers && isSameTournament && isSameCategory
    })
    return subscription ?? null
  }

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
