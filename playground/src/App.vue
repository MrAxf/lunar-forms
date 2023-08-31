<script setup lang="ts">
import {
  // useField,
  required,
  LunarForm,
  LunarField,
  minLength,
  email,
  url,
  pattern,
  toNumber,
  toCase,
  UPPER_CASE,
  max,
  min,
  // useForm,
  // useFieldArray,
  maxLength,
} from '@lunar-forms/core';
import lunarFormLogo from './assets/logo.svg';
// import { useAutoAnimate } from '@formkit/auto-animate/vue';
// import { Icon } from '@iconify/vue';

// const { values, errors, formProps } = useForm({
//   initialValues: {
//     hola: ['1', '2', '3'],
//   },
//   handleSubmit(values) {
//     console.log(values);
//   },
// });
// const { fields, error, push, swap, remove, prepend, replace, update, insert } =
//   useFieldArray('hola', { validate: [minLength('Max Len', 4)] });

// const [parent] = useAutoAnimate();
</script>

<template>
  <main class="container mx-auto flex flex-col gap-20 py-10">
    <header class="flex gap-5">
      <img
        :src="lunarFormLogo"
        alt="Lunar Forms logotype"
        class="h-full w-auto"
      />
      <h1
        class="mb-5 bg-gradient-to-br from-purple-600 to-fuchsia-300 bg-clip-text text-8xl font-bold text-transparent"
      >
        Lunar Forms
      </h1>
    </header>
    <!-- <div class="flex gap-5">
      <section class="flex-1 flex-grow">
        <form v-bind="formProps" class="m-5 flex flex-col items-start gap-5">
          <div ref="parent" class="flex flex-col gap-5">
            <div
              v-for="(field, idx) in fields"
              :key="field.key"
              class="flex flex-row gap-5"
            >
              <input
                type="text"
                v-model="field.value"
                class="input bg-base-300"
              />
              <button
                :disabled="idx === fields.length - 1"
                class="btn btn-square"
                @click="swap(idx, idx + 1)"
              >
                <Icon icon="material-symbols:arrow-downward" width="1.5rem" />
              </button>
              <button
                :disabled="idx === 0"
                class="btn btn-square"
                @click="swap(idx, idx - 1)"
              >
                <Icon icon="material-symbols:arrow-upward" width="1.5rem" />
              </button>
              <button class="btn btn-square" @click="update(idx, 5)">
                <Icon icon="material-symbols:update" width="1.5rem" />
              </button>
              <button class="btn btn-square" @click="remove(idx)">
                <Icon icon="material-symbols:delete" width="1.5rem" />
              </button>
            </div>
          </div>
          <div class="flex flex-wrap gap-5">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-primary">Reset</button>
          </div>
          <div class="flex flex-wrap gap-5">
            <button
              type="button"
              class="btn btn-accent"
              @click="prepend('hola')"
            >
              Prepend
            </button>
            <button type="button" class="btn btn-accent" @click="push('hola')">
              Push
            </button>
            <button
              type="button"
              class="btn btn-accent"
              @click="replace([3, 2, 1])"
            >
              Replace
            </button>
            <button type="button" class="btn btn-accent" @click="insert(2, 9)">
              Insert
            </button>
          </div>
        </form>
      </section>
      <section class="bg-base-300 rounded-box flex-1 flex-grow p-5">
        <pre>{{ { error, values, errors, fields } }}</pre>
      </section>
    </div> -->

    <LunarForm class="flex gap-5" v-slot="{ values, errors }">
      <section class="flex-1 flex-grow flex-col">
        <div class="flex flex-col gap-2">
          <label for="nombre">Nombre:</label>
          <LunarField
            name="nombre"
            class="input bg-base-300"
            :transform="[toCase(UPPER_CASE)]"
            :validate="[
              required('El nombre es requerido'),
              minLength('El nombre debe tener 3 o más caracteres', 3),
              maxLength('El nombre debe tener 10 o menos caracteres', 10),
            ]"
          />
          <span class="text-xs text-red-500">{{
            errors.value?.['nombre']
          }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="nombre">Email:</label>
          <LunarField
            name="email"
            class="input bg-base-300"
            type="email"
            :validate="[
              email('El valor debe ser una dirección de correo válida'),
            ]"
          />
          <span class="text-xs text-red-500">{{
            errors.value?.['email']
          }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="nombre">Url:</label>
          <LunarField
            name="url"
            class="input bg-base-300"
            type="url"
            :validate="[url('El valor debe ser una url válida')]"
          />
          <span class="text-xs text-red-500">{{ errors.value?.['url'] }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="nombre">Pattern:</label>
          <LunarField
            name="pattern"
            class="input bg-base-300"
            :validate="[
              pattern(
                'El valor debe ser un teléfono válido',
                /^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/
              ),
            ]"
          />
          <span class="text-xs text-red-500">{{
            errors.value?.['pattern']
          }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="nombre">Number:</label>
          <LunarField
            name="number"
            type="number"
            :transform="[toNumber()]"
            :validate="[
              min('El número ha de ser al menos 5', 5),
              max('El número ha de ser como mucho 10', 10),
            ]"
            class="input bg-base-300"
          />
          <span class="text-xs text-red-500">{{
            errors.value?.['number']
          }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="nombre">Date:</label>
          <LunarField
            name="date"
            type="date"
            :validate="[
              min('El número ha de ser al menos 5', '2023-08-01'),
              max('El número ha de ser como mucho 10', '2023-08-31'),
            ]"
            class="input bg-base-300"
          />
          <span class="text-xs text-red-500">{{ errors.value?.['date'] }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <label for="nombre">Checked:</label>
          <LunarField
            name="checked"
            type="checkbox"
            class="input bg-base-300"
          />
          <span class="text-xs text-red-500">{{
            errors.value?.['checked']
          }}</span>
        </div>
        <div class="flex gap-5">
          <button class="btn btn-primary" type="submit">Submit</button>
          <button class="btn btn-accent" type="reset">Reset</button>
        </div>
      </section>
      <section class="bg-base-300 rounded-box flex-1 flex-grow p-5">
        <pre>{{ { values, errors } }}</pre>
      </section>
    </LunarForm>
  </main>
</template>
