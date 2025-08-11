import { TournamentRepository } from '@/repositories/tournaments-repository'
import { Tournament } from '@prisma/client'

interface CreateTournamentUseCaseRequest {
  title: string
  description: string
  phone: string
  location: string
  creator_id: string
}
interface CreateTournamentUseCaseResponse {
  tournament: Tournament
}

export class CreateTournamentUseCase {
  constructor(private tournamentsRepository: TournamentRepository) {}

  async execute({
    title,
    description,
    phone,
    location,
    creator_id,
  }: CreateTournamentUseCaseRequest): Promise<CreateTournamentUseCaseResponse> {
    const tournament = await this.tournamentsRepository.create({
      title,
      description,
      phone,
      location,
      creator: {
        connect: {
          id: creator_id,
        },
      },
    })

    return {
      tournament,
    }
  }
}
