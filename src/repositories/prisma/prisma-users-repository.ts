import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { usersRepository } from '../users-repository'

export class PrismaUsersRepository implements usersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findByPhone(phone: string) {
    return prisma.user.findUnique({
      where: {
        phone,
      },
    })
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
