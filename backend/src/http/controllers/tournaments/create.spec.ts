import request from 'supertest'
import { app } from 'backend/src/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from 'backend/src/use-cases/utils/test/create-and-authenticate-user'

describe('Create Tournament (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a tournament', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/tournaments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Metropolitano',
        description: 'This is a new tournament',
        phone: '11111111111',
        location: 'Stadium A',
        state: 'California',
        city: 'Los Angeles',
        creatorId: 'user-id-123',
      })

    expect(response.statusCode).toEqual(201)
  })
})
