import { Prisma, Tournament } from '@prisma/client'

export interface TournamentRepository {
  create(data: Prisma.TournamentCreateInput): Promise<Tournament>
  findById(id: string): Promise<Tournament | null>
}
