export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
export class PhoneAlreadyExistsError extends Error {
  constructor() {
    super('Phone already register')
  }
}
