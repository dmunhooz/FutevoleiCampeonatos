import { PrismaTournamentsRepository } from 'backend/src/repositories/prisma/prisma-tournaments-repository'
import { CreateTournamentUseCase } from '../create-tournament'

export function makeCreateTournamentUseCase() {
  const tournamentsRepository = new PrismaTournamentsRepository()
  const useCase = new CreateTournamentUseCase(tournamentsRepository)

  return useCase
}
