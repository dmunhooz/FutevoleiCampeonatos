import { Prisma, Tournament } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { TournamentRepository } from '../tournaments-repository'

export class InMemoryTournamentsRepository implements TournamentRepository {
  public items: Tournament[] = []

  async findById(id: string): Promise<Tournament | null> {
    const tournament = this.items.find((item) => item.id === id)
    return tournament ?? null
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.TournamentCreateInput): Promise<Tournament> {
    const tournament: Tournament = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      location: data.location,
      state: data.state,
      city: data.city,
      created_at: new Date(),
      updated_at: new Date(),
      creator_id: data.creator.connect?.id ?? '',
    }
    this.items.push(tournament)
    return tournament
  }
}
