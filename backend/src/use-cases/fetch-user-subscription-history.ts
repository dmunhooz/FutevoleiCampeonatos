import { SubscriptionRepository } from 'src/repositories/subscriptions-repository'
import { Subscription } from '@prisma/client'

interface FetchUserSubscriptionHistoryRequest {
  user_id: string
  page: number
}

interface FetchUserSubscriptionHistoryResponse {
  subscriptions: Subscription[]
}

export class FetchUserSubscriptionHistoryUseCase {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async execute({
    user_id,
    page,
  }: FetchUserSubscriptionHistoryRequest): Promise<FetchUserSubscriptionHistoryResponse> {
    const subscriptions = await this.subscriptionRepository.findManyByUserId(
      user_id,
      page,
    )

    return {
      subscriptions,
    }
  }
}
