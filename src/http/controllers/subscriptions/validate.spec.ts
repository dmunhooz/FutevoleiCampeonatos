import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate Subscription (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a subscription', async () => {
    // Cria e autentica o usuário que fará a inscrição
    const { token, user } = await createAndAuthenticateUser(app, true)

    // Cria o usuário dono do torneio
    const tournamentOwner = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: `johndoe+${Date.now()}@example.com`,
        password_hash: '123456',
        phone: '11111111113',
      },
    })

    // Cria o Campeonato
    const tournament = await prisma.tournament.create({
      data: {
        title: 'Tournament Title',
        description: 'Tournament Description',
        phone: '123456789',
        location: 'Tournament Location',
        state: 'Tournament State',
        city: 'Tournament City',
        creator_id: tournamentOwner.id,
      },
    })

    // Cria o usuário participante
    const partner = await prisma.user.create({
      data: {
        name: 'John Doe 2',
        email: `johndoe+${Date.now()}2@example.com`,
        password_hash: '123456',
        phone: '11111111221',
      },
    })

    // Cria a categoria associada ao torneio
    const category1 = await prisma.category.create({
      data: {
        name: 'Misto',
        tournament: {
          connect: { id: tournament.id },
        },
      },
    })

    // Faz a inscrição na categoria do torneio
    let subscription = await prisma.subscription.create({
      data: {
        tournament_id: tournament.id,
        category_id: category1.id,
        player1_id: user.id,
        player2_id: partner.id,
        payment_status: 'CONFIRMED',
      },
    })

    const response = await request(app.server)
      .patch(`/subscriptions/${subscription.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)

    subscription = await prisma.subscription.findUniqueOrThrow({
      where: {
        id: subscription.id,
      },
    })

    expect(subscription.validated_at).toEqual(expect.any(Date))
  })
})
