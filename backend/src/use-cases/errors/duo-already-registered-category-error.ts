export class DuoAlreadyRegisteredError extends Error {
  constructor() {
    super('Duo already subscribed.')
  }
}
