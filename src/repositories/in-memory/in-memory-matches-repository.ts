import { Match, $Enums, Prisma } from '@prisma/client'
import { MatchRepository } from '../matches-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryMatchesRepository implements MatchRepository {
  public items: Match[] = []

  async create(data: Prisma.MatchUncheckedCreateInput) {
    const match = {
      id: randomUUID(),
      group_id: data.group_id,
      tournament_id: data.tournament_id,
      category_id: data.category_id,
      team1_id: data.team1_id ?? null,
      team2_id: data.team2_id ?? null,
      score_team1: data.score_team1 ?? null,
      score_team2: data.score_team2 ?? null,
      court_id: data.court_id ?? null,
      start_time: data.start_time ? new Date(data.start_time) : null,
      round: (data.round as $Enums.Phase) ?? null,
    }
    this.items.push(match)
    return match
  }

  async update(id: string, data: Prisma.MatchUncheckedUpdateInput) {
    const match = this.items.find((item) => item.id === id)
    if (!match) {
      throw new Error('Match not found')
    }

    const defaultStartTime = new Date()
    defaultStartTime.setHours(8, 0, 0, 0)

    const updatedMatch: typeof match = {
      ...match,
      id: (data.id as string) ?? match.id,
      group_id: (data.group_id as string) ?? match.group_id,
      tournament_id: (data.tournament_id as string) ?? match.tournament_id,
      category_id: (data.category_id as string) ?? match.category_id,
      team1_id: (data.team1_id as string | null) ?? match.team1_id,
      team2_id: (data.team2_id as string | null) ?? match.team2_id,
      score_team1: (data.score_team1 as number | null) ?? match.score_team1,
      score_team2: (data.score_team2 as number | null) ?? match.score_team2,
      court_id: (data.court_id as string | null) ?? match.court_id,
      start_time:
        data.start_time === null || data.start_time === undefined
          ? defaultStartTime
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            new Date(data.start_time as any),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      round: (data.round as any) ?? match.round,
    }

    // Substitui o match antigo na lista
    const index = this.items.findIndex((item) => item.id === id)
    this.items[index] = updatedMatch

    return updatedMatch
  }

  async delete(id: string) {
    this.items = this.items.filter((i) => i.id !== id)
  }

  async findManyByTournament(tournamentId: string, page: number) {
    return this.items
      .filter((matches) => matches.tournament_id === tournamentId)
      .slice((page - 1) * 20, page * 20)
  }

  async findById(id: string) {
    const matches = this.items.find((item) => item.id === id)
    if (!matches) {
      return null
    }
    return matches
  }
}
