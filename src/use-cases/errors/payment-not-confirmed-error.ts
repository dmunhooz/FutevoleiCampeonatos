export class PaymentNotConfirmedError extends Error {
  constructor() {
    super('Payment not confirmed')
  }
}
