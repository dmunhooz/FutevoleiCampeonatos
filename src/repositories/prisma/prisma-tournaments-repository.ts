import { Prisma } from '@prisma/client'
import { TournamentRepository } from '../tournaments-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTournamentsRepository implements TournamentRepository {
  async create(data: Prisma.TournamentCreateInput) {
    const tournament = await prisma.tournament.create({
      data,
    })
    return tournament
  }

  async findById(id: string) {
    const tournament = await prisma.tournament.findUnique({
      where: {
        id,
      },
    })
    return tournament
  }

  async searchMany(query: string, page: number) {
    const tournaments = await prisma.tournament.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return tournaments
  }
}
