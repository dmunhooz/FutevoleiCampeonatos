import { Prisma, Subscription } from '@prisma/client'

export interface SubscriptionRepository {
  create(data: Prisma.SubscriptionUncheckedCreateInput): Promise<Subscription>
  findByDuoAndTournamentAndCategory(
    user1_id: string,
    user2_id: string,
    tournament_id: string,
    category_id: string,
  ): Promise<Subscription | null>
}
