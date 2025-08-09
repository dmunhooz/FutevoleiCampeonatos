import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  phone: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  phone,
  password,
}: RegisterUseCaseRequest) {
  // eslint-disable-next-line camelcase
  const password_hash = await hash(password, 6) // 6 = salt rounds

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      phone,
      // eslint-disable-next-line camelcase
      password_hash,
    },
  })
}
