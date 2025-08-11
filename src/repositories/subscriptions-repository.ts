import { Prisma, Subscription } from '@prisma/client'

export interface SubscriptionRepository {
  create(data: Prisma.SubscriptionUncheckedCreateInput): Promise<Subscription>
}
