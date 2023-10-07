import type {
  FieldOptions,
  FieldTransformer,
  FieldValue,
  FieldValidation,
  MaybeArray,
} from '@lunar-forms/core';

import { useField, useVModel } from '@lunar-forms/core';

interface CommonFieldProps {
  name: string;
  modelValue?: FieldValue;
  initialValue?: FieldValue;
  transform?: MaybeArray<FieldTransformer>;
  refine?: MaybeArray<FieldTransformer>;
  validate?: MaybeArray<FieldValidation>;
  validateOn?: 'input' | 'change' | 'blur' | null;
}

export function useCommonField(
  props: CommonFieldProps,
  emit: {
    (e: 'update:modelValue', value: FieldValue): void;
    (e: 'blur', ev: FocusEvent): void;
    (e: 'change', ev: Event): void;
    (e: 'focus', ev: FocusEvent): void;
    (e: 'input', ev: InputEvent): void;
  },
  fieldOptions: Partial<FieldOptions>
) {
  const id = `${props.name}-${crypto.randomUUID()}`;

  const fieldData = useField(props.name, {
    initialValue: props.initialValue,
    validateOn: props.validateOn,
    transform: props.transform,
    refine: props.refine,
    onblur(ev) {
      emit('blur', ev);
    },
    onchange(ev) {
      emit('change', ev);
    },
    onfocus(ev) {
      emit('focus', ev);
    },
    oninput(ev) {
      emit('input', ev);
    },
    ...fieldOptions,
  });

  function onClear() {
    fieldData.value.value = undefined;
    emit('update:modelValue', fieldData.value.value);
    fieldData.validate();
  }

  useVModel(fieldData.value);

  return { id, fieldData, onClear };
}
