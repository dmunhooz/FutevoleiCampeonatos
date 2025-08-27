import request from 'supertest'
import { app } from 'src/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from 'src/use-cases/utils/test/create-and-authenticate-user'
import { prisma } from 'src/lib/prisma'

describe('Create subscription (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a subscription', async () => {
    // Cria e autentica o usuário que fará a inscrição
    const { token } = await createAndAuthenticateUser(app)

    // Cria o usuário dono do torneio
    const tournamentOwner = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: `johndoe+${Date.now()}@example.com`,
        password_hash: '123456',
        phone: '11111111113',
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

    // Cria a categoria associada ao torneio
    const category = await prisma.category.create({
      data: {
        name: 'Misto',
        tournament: {
          connect: { id: tournament.id }, // agora tournament.id existe
        },
      },
    })

    // Faz a inscrição na categoria do torneio
    const response = await request(app.server)
      .post('/subscriptions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tournamentId: tournament.id,
        categoryId: category.id,
        partnerId: partner.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
