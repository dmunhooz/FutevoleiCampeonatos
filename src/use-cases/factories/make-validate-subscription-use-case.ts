import { PrismaSubscriptionsRepository } from '@/repositories/prisma/prisma-subscriptions-repository'
import { ValidateSubscriptionUseCase } from '../validate-subscription'

export function makeValidateSubscriptionUseCase() {
  const subscriptionsRepository = new PrismaSubscriptionsRepository()
  const useCase = new ValidateSubscriptionUseCase(subscriptionsRepository)

  return useCase
}
