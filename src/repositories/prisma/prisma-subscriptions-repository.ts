import { Prisma, Subscription } from '@prisma/client'
import { SubscriptionRepository } from '../subscriptions-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSubscriptionsRepository implements SubscriptionRepository {
  async findById(id: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { id },
    })

    return subscription
  }

  async create(data: Prisma.SubscriptionUncheckedCreateInput) {
    const subscription = await prisma.subscription.create({
      data,
    })

    return subscription
  }

  async findByDuoAndTournamentAndCategory(
    user1_id: string,
    user2_id: string,
    tournament_id: string,
    category_id: string,
  ) {
    const subscription = await prisma.subscription.findFirst({
      where: {
        player1_id: user1_id,
        player2_id: user2_id,
        tournament_id,
        category_id,
      },
    })

    return subscription
  }

  async findManyByUserId(userId: string, page: number) {
    const subscriptions = await prisma.subscription.findMany({
      where: { id: userId },
      take: 20,
      skip: (page - 1) * 20,
    })

    return subscriptions
  }

  async save(data: Subscription) {
    const subscription = await prisma.subscription.update({
      where: { id: data.id },
      data,
    })

    return subscription
  }
}
