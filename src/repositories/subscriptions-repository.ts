import { Prisma, Subscription } from '@prisma/client'

export interface SubscriptionRepository {
  findById(id: string): Promise<Subscription | null>
  create(data: Prisma.SubscriptionUncheckedCreateInput): Promise<Subscription>
  findByDuoAndTournamentAndCategory(
    user1_id: string,
    user2_id: string,
    tournament_id: string,
    category_id: string,
  ): Promise<Subscription | null>
  findManyByUserId(user_id: string, page: number): Promise<Subscription[]>
  save(subscription: Subscription): Promise<Subscription>
}
