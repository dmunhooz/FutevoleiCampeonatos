import { UsersRepository } from 'backend/src/repositories/users-repository'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import {
  PhoneAlreadyExistsError,
  UserAlreadyExistsError,
} from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  phone: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    phone,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    // Verifica e-mail duplicado
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // Verifica telefone duplicado
    const userWithSamePhone = await this.usersRepository.findByPhone(phone)
    if (userWithSamePhone) {
      throw new PhoneAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      phone,
      password_hash,
    })

    return {
      user,
    }
  }
}
