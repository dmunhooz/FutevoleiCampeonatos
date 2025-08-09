import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-erros'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '11111111111',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'Johndoe@example.com',
      phone: '11111111111',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      phone: '11111111111',
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        phone: '11111111111',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to register with same phone twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const phone = '11111111111'

    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone,
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
