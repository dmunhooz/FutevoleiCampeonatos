import { SearchTournamentsUseCase } from '../search-tournaments'
import { PrismaTournamentsRepository } from 'src/repositories/prisma/prisma-tournaments-repository'

export function makeSearchTournamentsUseCase() {
  const tournamentsRepository = new PrismaTournamentsRepository()
  const useCase = new SearchTournamentsUseCase(tournamentsRepository)

  return useCase
}
