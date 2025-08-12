import { SubscriptionUseCase } from '../subscription'
import { PrismaSubscriptionsRepository } from '@/repositories/prisma/prisma-subscriptions-repository'
import { PrismaTournamentsRepository } from '@/repositories/prisma/prisma-tournaments-repository'

export function makeSubscriptionUseCase() {
  const subscriptionsRepository = new PrismaSubscriptionsRepository()
  const tournamentsRepository = new PrismaTournamentsRepository()
  const useCase = new SubscriptionUseCase(
    subscriptionsRepository,
    tournamentsRepository,
  )

  return useCase
}
