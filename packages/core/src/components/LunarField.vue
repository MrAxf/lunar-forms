<!-- eslint-disable vue/require-default-prop -->
<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<!-- eslint-disable vue/no-setup-props-destructure -->
<script setup lang="ts">
import {
  type Component,
  h,
  useAttrs,
  withDirectives,
  vModelDynamic,
  Fragment,
} from 'vue';
import { useField } from '../composables';
import type {
  FieldData,
  FieldTransformer,
  FieldValidation,
  FieldValue,
  MaybeArray,
} from '../types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    name: string;
    modelValue?: FieldValue;
    initialValue?: FieldValue;
    transform?: MaybeArray<FieldTransformer>;
    refine?: MaybeArray<FieldTransformer>;
    validate?: MaybeArray<FieldValidation>;
    validateOn?: 'input' | 'change' | 'blur' | null;
    trueValue: FieldValue;
    falseValue?: FieldValue;
    as?: Component | 'input' | 'textarea' | 'select';
  }>(),
  {
    validateOn: 'input',
    isCheckbox: false,
    as: 'input',
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: FieldValue): void;
  (e: 'blur', ev: FocusEvent): void;
  (e: 'change', ev: Event): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'input', ev: InputEvent): void;
}>();

const slots = defineSlots<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default(props: FieldData): any;
}>();

const attrs = useAttrs();

const fieldData = useField(props.name, {
  initialValue: props.initialValue,
  validate: props.validate,
  validateOn: props.validateOn,
  transform: props.transform,
  refine: props.refine,
  type: attrs['type'] as string,
  trueValue: props.trueValue,
  falseValue: props.falseValue,
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
    // @ts-ignore
    emit('input', ev);
  },
});

const { name: fieldName, fieldProps, value: fieldValue } = fieldData;

function InputElement() {
  const slot = {
    default: () => slots.default(fieldData),
  };
  const renderAttrs: Record<string, unknown> = {
    ...attrs,
    ...fieldProps,
    name: fieldName,
    'onUpdate:modelValue': (newValue: FieldValue) => {
      fieldValue.value = newValue;
    },
  };
  // @ts-ignore
  const isComponent: boolean = props.as._isvue;
  const hasSlot = props.as === 'select' || isComponent;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!!slots.default && ['input', 'textarea'].includes(props.as as any)) {
    return h(Fragment, slot);
  }

  if (isComponent) renderAttrs.modelValue = fieldValue.value;
  if (attrs['type'] === 'checkbox') {
    renderAttrs['true-value'] = props.trueValue ?? null;
    renderAttrs['false-value'] = props.falseValue ?? null;
  }

  // @ts-ignore
  const view = h(props.as, renderAttrs, hasSlot ? slot : []);

  if (!isComponent)
    return withDirectives(view, [[vModelDynamic, fieldValue.value]]);

  return view;
}
</script>

<template>
  <InputElement />
</template>
