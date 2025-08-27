import { TournamentRepository } from 'src/repositories/tournaments-repository'
import { Tournament } from '@prisma/client'

interface SearchTournamentsUseCaseRequest {
  title: string
  page: number
}
interface SearchTournamentsUseCaseResponse {
  tournaments: Tournament[]
}

export class SearchTournamentsUseCase {
  constructor(private tournamentsRepository: TournamentRepository) {}

  async execute({
    title,
    page,
  }: SearchTournamentsUseCaseRequest): Promise<SearchTournamentsUseCaseResponse> {
    const tournaments = await this.tournamentsRepository.searchMany(title, page)

    return {
      tournaments,
    }
  }
}
