import { SubscriptionRepository } from '@/repositories/subscriptions-repository'
import { Subscription } from '@prisma/client'

interface SubscriptionUseCaseRequest {
  user1_id: string
  user2_id: string
  tournamentId: string
  category_id: string
}

interface SubscriptionUseCaseResponse {
  subscription: Subscription
}

export class SubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async execute({
    user1_id,
    user2_id,
    tournamentId,
    category_id,
  }: SubscriptionUseCaseRequest): Promise<SubscriptionUseCaseResponse> {
    const subscription = await this.subscriptionRepository.create({
      player1_id: user1_id,
      player2_id: user2_id,
      tournament_id: tournamentId,
      category_id,
    })
    return {
      subscription,
    }
  }
}
