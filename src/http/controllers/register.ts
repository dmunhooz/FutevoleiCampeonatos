import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import {
  UserAlreadyExistsError,
  PhoneAlreadyExistsError,
} from '@/use-cases/errors/user-already-exists-erros'
import { makeRegisterUseCase } from '../../use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string().min(6),
  })

  const { name, email, phone, password } = registerBodySchema.parse(
    request.body,
  )
  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      phone,
      password,
    })
  } catch (err) {
    if (
      err instanceof UserAlreadyExistsError ||
      err instanceof PhoneAlreadyExistsError
    ) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
