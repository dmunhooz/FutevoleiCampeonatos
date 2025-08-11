import { TournamentRepository } from '@/repositories/tournaments-repository'
import { Tournament } from '@prisma/client'

interface SearchTournamentsUseCaseRequest {
  query: string
  page: number
}
interface SearchTournamentsUseCaseResponse {
  tournaments: Tournament[]
}

export class SearchTournamentsUseCase {
  constructor(private tournamentsRepository: TournamentRepository) {}

  async execute({
    query,
    page,
  }: SearchTournamentsUseCaseRequest): Promise<SearchTournamentsUseCaseResponse> {
    const tournaments = await this.tournamentsRepository.searchMany(query, page)

    return {
      tournaments,
    }
  }
}
