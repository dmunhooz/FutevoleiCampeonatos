import request from 'supertest'
import { app } from 'src/app'
import { prisma } from 'src/lib/prisma'
import { $Enums } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'
import { createAndAuthenticateUser } from 'src/use-cases/utils/test/create-and-authenticate-user'

describe('Update Match (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should allow ADMIN to update match scores', async () => {
    // Cria o usuario ADMIN
    const admin = await prisma.user.create({
      data: {
        id: randomUUID(),
        name: 'Admin User',
        email: 'admin@example.com',
        password_hash: 'admin123',
        phone: '1234567890',
        role: 'ADMIN',
        created_at: new Date(),
      },
    })

    // Gera token JWT para o admin
    const adminToken = app.jwt.sign({ sub: admin.id, role: admin.role })

    // Cria o torneio
    const tournament = await prisma.tournament.create({
      data: {
        title: 'Metropolitano',
        description: 'This is a new tournament',
        phone: '11111111111',
        location: 'Stadium A',
        state: 'Rio Grande do Sul',
        city: 'Canoas',
        creator_id: admin.id, // Usa o ID do usuário ADMIN criado acima
      },
    })

    // Cria a Category
    const category = await prisma.category.create({
      data: {
        name: 'Misto',
        tournament: {
          connect: { id: tournament.id }, // agora tournament.id existe
        },
      },
    })

    // Cria e autentica o usuário que fará a inscrição (Inscrição 1)
    const { user } = await createAndAuthenticateUser(app)

    // Cria o outro usuário participante (Inscrição 1)
    const partner = await prisma.user.create({
      data: {
        name: 'John Doe 2',
        email: `johndoe+${Date.now()}2@example.com`,
        password_hash: '123456',
        phone: '11111111221',
      },
    })

    // Faz a inscrição 1 na categoria do torneio
    const subscription1 = await prisma.subscription.create({
      data: {
        tournament_id: tournament.id,
        category_id: category.id,
        player1_id: user.id,
        player2_id: partner.id,
        payment_status: 'CONFIRMED',
      },
    })

    // Cria o outro usuário participante (Inscrição 2)
    const user2 = await prisma.user.create({
      data: {
        name: 'John Doe 3',
        email: `johndoe+${Date.now()}3@example.com`,
        password_hash: '123456',
        phone: '11111111441',
      },
    })

    // Cria o outro usuário participante (Inscrição 2)
    const user3 = await prisma.user.create({
      data: {
        name: 'John Doe 4',
        email: `johndoe+${Date.now()}4@example.com`,
        password_hash: '123456',
        phone: '11111111451',
      },
    })

    // Faz a inscrição 2 na categoria do torneio
    const subscription2 = await prisma.subscription.create({
      data: {
        tournament_id: tournament.id,
        category_id: category.id,
        player1_id: user2.id,
        player2_id: user3.id,
        payment_status: 'CONFIRMED',
      },
    })

    // Cria o grupo
    const group = await prisma.group.create({
      data: {
        id: randomUUID(),
        tournament_id: tournament.id,
        category_id: category.id,
        name: $Enums.NameGroups.A,
      },
    })

    // Cria uma partida
    const match = await prisma.match.create({
      data: {
        id: randomUUID(),
        tournament_id: tournament.id,
        category_id: category.id,
        group_id: group.id,
        team1_id: subscription1.id,
        team2_id: subscription2.id,
        score_team1: 0,
        score_team2: 0,
        start_time: new Date(),
        round: $Enums.Phase.Groups,
      },
    })

    // Faz o update como ADMIN
    const response = await request(app.server)
      .put(`/matches/${match.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        score_team1: 18,
        score_team2: 7,
        start_time: new Date(),
        round: $Enums.Phase.Groups,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.match.score_team1).toEqual(18)
    expect(response.body.match.score_team2).toEqual(7)
  })

  it('should not allow MEMBER to update match scores', async () => {
    // Cria o usuario ADMIN
    const admin = await prisma.user.create({
      data: {
        id: randomUUID(),
        name: 'Admin User',
        email: 'admin@example2.com',
        password_hash: 'admin123',
        phone: '12345678920',
        role: 'ADMIN',
        created_at: new Date(),
      },
    })

    // Cria o torneio
    const tournament = await prisma.tournament.create({
      data: {
        title: 'Metropolitano',
        description: 'This is a new tournament',
        phone: '11111111111',
        location: 'Stadium A',
        state: 'Rio Grande do Sul',
        city: 'Canoas',
        creator_id: admin.id, // Usa o ID do usuário ADMIN criado acima
      },
    })

    // Cria a Category
    const category = await prisma.category.create({
      data: {
        name: 'Misto',
        tournament: {
          connect: { id: tournament.id }, // agora tournament.id existe
        },
      },
    })

    // Cria e autentica o usuário que fará a inscrição (Inscrição 1)
    const { user } = await createAndAuthenticateUser(app)

    // Cria o outro usuário participante (Inscrição 1)
    const partner = await prisma.user.create({
      data: {
        name: 'John Doe 2',
        email: `johndoe+${Date.now()}2@example.com`,
        password_hash: '123456',
        phone: `119${Math.floor(10000000 + Math.random() * 89999999)}`,
      },
    })

    // Faz a inscrição 1 na categoria do torneio
    const subscription1 = await prisma.subscription.create({
      data: {
        tournament_id: tournament.id,
        category_id: category.id,
        player1_id: user.id,
        player2_id: partner.id,
        payment_status: 'CONFIRMED',
      },
    })

    // Cria o outro usuário participante (Inscrição 2)
    const user2 = await prisma.user.create({
      data: {
        name: 'John Doe 3',
        email: `johndoe+${Date.now()}3@example.com`,
        password_hash: '123456',
        phone: `119${Math.floor(10000000 + Math.random() * 89999999)}`,
      },
    })

    // Cria o outro usuário participante (Inscrição 2)
    const user3 = await prisma.user.create({
      data: {
        name: 'John Doe 4',
        email: `johndoe+${Date.now()}4@example.com`,
        password_hash: '123456',
        phone: `119${Math.floor(10000000 + Math.random() * 89999999)}`,
        role: 'MEMBER',
      },
    })

    const memberToken = app.jwt.sign({ sub: user3.id, role: user3.role })

    // Faz a inscrição 2 na categoria do torneio
    const subscription2 = await prisma.subscription.create({
      data: {
        tournament_id: tournament.id,
        category_id: category.id,
        player1_id: user2.id,
        player2_id: user3.id,
        payment_status: 'CONFIRMED',
      },
    })

    // Cria o grupo
    const group = await prisma.group.create({
      data: {
        id: randomUUID(),
        tournament_id: tournament.id,
        category_id: category.id,
        name: $Enums.NameGroups.A,
      },
    })

    // Cria uma partida
    const match = await prisma.match.create({
      data: {
        id: randomUUID(),
        tournament_id: tournament.id,
        category_id: category.id,
        group_id: group.id,
        team1_id: subscription1.id,
        team2_id: subscription2.id,
        score_team1: 0,
        score_team2: 0,
        start_time: new Date(),
        round: $Enums.Phase.Groups,
      },
    })

    // Faz o update como MEMBER
    const response = await request(app.server)
      .put(`/matches/${match.id}`)
      .set('Authorization', `Bearer ${memberToken}`)
      .send({
        score_team1: 18,
        score_team2: 7,
        start_time: new Date(),
        round: $Enums.Phase.Groups,
      })

    expect(response.statusCode).toEqual(403)
  })
})
