import { PrismaSubscriptionsRepository } from 'src/repositories/prisma/prisma-subscriptions-repository'
import { FetchUserSubscriptionHistoryUseCase } from '../fetch-user-subscription-history'

export function makeFetchUserSubscriptionsHistoryUseCase() {
  const subscriptionsRepository = new PrismaSubscriptionsRepository()
  const useCase = new FetchUserSubscriptionHistoryUseCase(
    subscriptionsRepository,
  )

  return useCase
}
