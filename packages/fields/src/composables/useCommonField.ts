import {
  useField,
  type FieldOptions,
  type FieldTransformer,
  type FieldValue,
  type Maybe,
  type FieldValidation,
} from '@lunar-forms/core';
import { watch } from 'vue';

interface CommonFieldProps {
  name: string;
  modelValue?: FieldValue;
  initialValue?: FieldValue;
  transform?: Maybe<FieldTransformer[]>;
  validate?: Maybe<FieldValidation[]>;
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
    initialValue: props.initialValue || props.modelValue,
    validateOn: props.validateOn,
    transform: props.transform,
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

  watch(
    () => props.modelValue,
    (newVal) => {
      fieldData.value.value = newVal;
    }
  );

  watch(fieldData.value, (newVal) => {
    emit('update:modelValue', newVal);
  });

  return { id, fieldData, onClear };
}
