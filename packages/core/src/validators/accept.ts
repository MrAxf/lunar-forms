import type { FieldValidation } from '@/types';
import { formatMessage } from '@/utils';

export function accept(
  error: string,
  requirement: string | string[]
): FieldValidation {
  return (value) => {
    if (
      !value ||
      (!Array.isArray(value) && !(value instanceof File)) ||
      (Array.isArray(value) && !value.every((item) => item instanceof File))
    )
      return undefined;
    const requirementArr =
      typeof requirement === 'string' ? [requirement] : requirement;

    if (Array.isArray(value)) {
      return (value as File[]).every((file) => checkFile(file, requirementArr))
        ? undefined
        : formatMessage(error, {
            requirement: String(requirement),
            value: String(value),
          });
    }
    return checkFile(value, requirementArr)
      ? undefined
      : formatMessage(error, {
          requirement: String(requirement),
          value: String(value),
        });
  };
}

function checkFile(file: File, requirement: string[]) {
  return requirement.every((req) => {
    if (req.startsWith('.')) {
      const fileExtension = '.' + file.name.split('.').pop();
      return fileExtension === req;
    } else if (req.endsWith('/*')) {
      const mimeTypeCategory = file.type.split('/')[0] + '/*';
      return mimeTypeCategory === req;
    }
    return req === file.type;
  });
}
