import type { FieldTransformer, FieldValue, FormContext } from '../types';

export function transformValue(
  value: FieldValue,
  transformers: FieldTransformer[],
  formCtx?: FormContext
) {
  let finalValue = value;
  transformers.forEach((transformer) => {
    finalValue = transformer(finalValue, formCtx);
  });
  return finalValue;
}
