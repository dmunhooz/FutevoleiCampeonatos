import request from 'supertest'
import { app } from 'backend/src/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from 'backend/src/use-cases/utils/test/create-and-authenticate-user'

describe('Search Tournaments (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search tournaments by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/tournaments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Metropolitano',
        description: 'This is a new tournament',
        phone: '11111111111',
        location: 'Stadium A',
        state: 'California',
        city: 'Los Angeles',
        creator_id: 'user-id-123',
      })

    await request(app.server)
      .post('/tournaments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Fusion',
        description: 'This is a new tournament',
        phone: '11111111211',
        location: 'Stadium b',
        state: 'New York',
        city: 'New York',
        creator_id: 'user-id-124',
      })

    const response = await request(app.server)
      .get('/tournaments/search')
      .query({ title: 'Metropolitano' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.tournaments).toHaveLength(1)
    expect(response.body.tournaments).toEqual([
      expect.objectContaining({
        title: 'Metropolitano',
      }),
    ])
  })
})
