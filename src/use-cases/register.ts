import { prisma } from '@/lib/prisma'
import { usersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import {
  PhoneAlreadyExistsError,
  UserAlreadyExistsError,
} from './errors/user-already-exists-erros'

interface RegisterUseCaseRequest {
  name: string
  email: string
  phone: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({ name, email, phone, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    // Verifica e-mail duplicado
    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    })
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // Verifica telefone duplicado
    const userWithSamePhone = await prisma.user.findUnique({
      where: { phone },
    })
    if (userWithSamePhone) {
      throw new PhoneAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      phone,
      password_hash,
    })
  }
}
