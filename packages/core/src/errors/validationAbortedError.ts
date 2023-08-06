export class ValidationAbortedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationAbortedError';
  }
}
