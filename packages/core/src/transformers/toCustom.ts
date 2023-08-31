import type { FieldTransformer } from '../types/field';

export function toCustom(transformer: FieldTransformer): FieldTransformer {
  return (value, formCtx) => transformer(value, formCtx);
}
