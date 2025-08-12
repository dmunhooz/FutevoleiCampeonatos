import { SubscriptionRepository } from '@/repositories/subscriptions-repository'
import { PaymentStatus, Subscription } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface ValidateSubscriptionUseCaseRequest {
  subscriptionId: string
}

interface ValidateSubscriptionUseCaseResponse {
  subscription: Subscription
}

export class ValidateSubscriptionUseCase {
  constructor(private subscriptionsRepository: SubscriptionRepository) {}

  async execute({
    subscriptionId,
  }: ValidateSubscriptionUseCaseRequest): Promise<ValidateSubscriptionUseCaseResponse> {
    const subscription =
      await this.subscriptionsRepository.findById(subscriptionId)

    if (!subscription) {
      throw new ResourceNotFoundError()
    }

    if (subscription.payment_status !== PaymentStatus.CONFIRMED) {
      throw new Error('Payment not confirmed')
    }

    subscription.validated_at = new Date()

    const updatedSubscription =
      await this.subscriptionsRepository.save(subscription)

    return {
      subscription: updatedSubscription,
    }
  }
}
