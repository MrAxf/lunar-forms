export class GetDataAbortedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GetDataAbortedError';
  }
}
