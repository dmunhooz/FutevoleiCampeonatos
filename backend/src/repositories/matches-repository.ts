import { Prisma, Match } from '@prisma/client'
export interface MatchRepository {
  create(data: Prisma.MatchUncheckedCreateInput): Promise<Match>
  findById(id: string): Promise<Match | null>
  update(id: string, data: Prisma.MatchUncheckedUpdateInput): Promise<Match>
  delete(id: string): Promise<void>
  findManyByTournament(tournamentId: string, page: number): Promise<Match[]>
}
