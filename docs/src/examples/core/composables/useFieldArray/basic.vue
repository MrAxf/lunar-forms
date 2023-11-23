<script setup>
import { LunarField, useFieldArray, useForm } from '@lunar-forms/core';

const { formProps } = useForm({
  handleSubmit: (data) => {
    alert(JSON.stringify(data, null, 2));
  },
  initialValues: {
    todos: [
      {
        todo: 'My todo',
        done: true,
      },
    ],
  },
});
const { fields, push, remove } = useFieldArray('todos', {});
</script>

<template>
  <form v-bind="formProps">
    <section>
      <article v-for="(field, idx) in fields" :key="field.key">
        <label :for="`todos[${idx}].todo`">
          Todo
          <LunarField :id="`todos[${idx}].todo`" :name="`todos[${idx}].todo`" />
        </label>
        <label :for="`todos[${idx}].done`">
          <LunarField
            :id="`todos[${idx}].done`"
            :name="`todos[${idx}].done`"
            type="checkbox"
            :true-value="true"
            :false-value="false"
          />
          Done
        </label>
        <button
          class="secondary"
          type="button"
          role="button"
          @click="
            () => {
              remove(idx);
            }
          "
        >
          Delete todo
        </button>
      </article>
      <button
        type="button"
        role="button"
        @click="
          () => {
            push({ todo: '' });
          }
        "
      >
        Add
      </button>
    </section>
    <div class="row gap">
      <button class="col" type="submit" role="button">Submit</button>
      <button class="col secondary" type="reset" role="button">Reset</button>
    </div>
  </form>
</template>
