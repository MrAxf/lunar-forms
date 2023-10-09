import type { FieldTransformer } from '@/types';

export function toCustom(transformer: FieldTransformer): FieldTransformer {
  return (value, formCtx) => transformer(value, formCtx);
}
