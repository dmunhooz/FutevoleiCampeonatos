import { SubscriptionRepository } from '@/repositories/subscriptions-repository'
import { Subscription } from '@prisma/client'
import { DuoAlreadyRegisteredError } from './errors/duo-already-registered-category-error'
import { TournamentRepository } from '@/repositories/tournaments-repository'

interface SubscriptionUseCaseRequest {
  user1_id: string
  user2_id: string
  tournament_id: string
  category_id: string
}

interface SubscriptionUseCaseResponse {
  subscription: Subscription
}

export class SubscriptionUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private tournamentRepository: TournamentRepository,
  ) {}

  async execute({
    user1_id,
    user2_id,
    tournament_id,
    category_id,
  }: SubscriptionUseCaseRequest): Promise<SubscriptionUseCaseResponse> {
    const tournament = await this.tournamentRepository.findById(tournament_id)

    if (!tournament) {
      throw new Error('Tournament not found')
    }

    const existingSubscription =
      await this.subscriptionRepository.findByDuoAndTournamentAndCategory(
        user1_id,
        user2_id,
        tournament_id,
        category_id,
      )

    if (existingSubscription) {
      throw new DuoAlreadyRegisteredError()
    }

    const subscription = await this.subscriptionRepository.create({
      player1_id: user1_id,
      player2_id: user2_id,
      tournament_id,
      category_id,
    })
    return {
      subscription,
    }
  }
}
