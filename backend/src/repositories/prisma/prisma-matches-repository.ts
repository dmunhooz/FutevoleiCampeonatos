import { Prisma, Match } from '@prisma/client'
import { MatchRepository } from '../matches-repository'
import { prisma } from 'backend/src/lib/prisma'

export class PrismaMatchesRepository implements MatchRepository {
  async findById(id: string) {
    const match = await prisma.match.findUnique({
      where: { id },
    })
    return match
  }

  async create(data: Prisma.MatchUncheckedCreateInput) {
    const match = await prisma.match.create({
      data,
    })
    return match
  }

  async update(
    id: string,
    data: Prisma.MatchUncheckedUpdateInput,
  ): Promise<Match> {
    const match = await prisma.match.update({
      where: { id },
      data,
    })
    return match
  }

  async delete(id: string): Promise<void> {
    await prisma.match.delete({
      where: { id },
    })
  }

  async findManyByTournament(tournamentId: string): Promise<Match[]> {
    const matches = await prisma.match.findMany({
      where: { tournament_id: tournamentId },
    })
    return matches
  }
}
