import { ValidationAbortedError, ValidationError } from '../errors';
import { FieldValidation, FieldValue, Maybe } from '../types';

export function validateFieldValue(
  validations: FieldValidation[],
  currValue: FieldValue,
  abortSignal: AbortSignal
) {
  return new Promise<Maybe<string>>((resolve, reject) => {
    const abortError = new ValidationAbortedError('Validation aborted');

    if (abortSignal.aborted) reject(abortError);

    abortSignal.addEventListener('abort', () => {
      reject(abortError);
    });

    (async () => {
      let result: Maybe<string> = undefined;

      await validations.every(async (validation) => {
        result = await validation(currValue);

        if (result) {
          reject(new ValidationError(result));
        }
        return !result;
      });

      if (!result) {
        resolve(undefined);
      }
    })();
  });
}
