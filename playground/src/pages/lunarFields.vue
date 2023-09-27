<script lang="ts" setup>
import { LunarForm } from '@lunar-forms/core';
import {
  CheckboxField,
  CheckboxesField,
  ColorField,
  DateField,
  DatetimeLocalField,
  EmailField,
  FileField,
  HiddenField,
  NumberField,
  PasswordField,
  RadioField,
  RangeField,
  SearchField,
  SelectField,
  TelField,
  TextField,
  TextareaField,
  TimeField,
  UrlField,
} from '@lunar-forms/fields';
</script>

<template>
  <LunarForm class="flex gap-5" v-slot="{ values, errors }">
    <section class="grid w-[60%] flex-grow grid-cols-2">
      <TextField
        v-auto-animate
        name="text"
        label="Text"
        help="Texto de prueba"
        placeholder="Texto ..."
        :max-lenght="10"
        :pattern="/^[A-Za-z]{3}$/"
        required
      />
      <TextareaField
        v-auto-animate
        name="textarea"
        label="Textarea"
        help="Texto de prueba"
        placeholder="Texto ..."
        :max-lenght="10"
        :pattern="/^[A-Za-z]{3}$/"
        required
        clear-button
      />
      <PasswordField
        v-auto-animate
        name="password"
        label="Password"
        help="Texto de prueba"
        placeholder="Contraseña ..."
        :min-lenght="8"
        show-button
        required
      />
      <PasswordField
        v-auto-animate
        name="password-repeat"
        label="Password repeat"
        help="Texto de prueba"
        placeholder="Contraseña ..."
        :min-lenght="8"
        confirm="password"
        show-button
        required
      />
      <EmailField
        v-auto-animate
        name="email"
        label="Email"
        help="Texto de prueba"
        placeholder="Email ..."
        clear-button
        required
      />
      <UrlField
        v-auto-animate
        name="url"
        label="Url"
        help="Texto de prueba"
        placeholder="Url ..."
        clear-button
        required
      />
      <NumberField
        v-auto-animate
        name="number"
        label="Number"
        help="Texto de prueba"
        placeholder="Number ..."
        clear-button
        :min="5"
        :max="10"
        required
      />
      <RangeField
        v-auto-animate
        name="range"
        label="Range"
        help="Texto de prueba"
        placeholder="Range ..."
        clear-button
        :min="5"
        :max="10"
        required
      />
      <SelectField
        v-auto-animate
        name="select"
        label="Select"
        help="Texto de prueba"
        placeholder="Select ..."
        required
        :options="['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4']"
      />
      <FileField
        v-auto-animate
        name="file"
        label="File"
        help="Texto de prueba"
        placeholder="File ..."
        clear-button
        multiple
        required
        :accept="['image/*', '.png']"
        :max-size="40000"
      />
      <SearchField
        v-auto-animate
        name="search"
        label="Search"
        help="Texto de prueba"
        placeholder="Texto ..."
      />
      <CheckboxField
        v-auto-animate
        name="checkbox"
        label="Checkbox"
        help="Texto de prueba"
        required
      />
      <CheckboxesField
        v-auto-animate
        name="checkboxes"
        label="Checkboxes"
        help="Texto de prueba"
        placeholder="Checkboxes ..."
        required
        :options="[
          {
            label: 'Opción Label 1',
            value: 'Opción 1',
            help: 'Texto de ayuda de ejemplo',
          },
          {
            label: 'Opción Label 2',
            value: 'Opción 2',
            help: 'Texto de ayuda de ejemplo',
          },
          {
            label: 'Opción Label 3',
            value: 'Opción 3',
            help: 'Texto de ayuda de ejemplo',
          },
          {
            label: 'Opción Label 4',
            value: 'Opción 4',
            help: 'Texto de ayuda de ejemplo',
          },
        ]"
      />
      <RadioField
        v-auto-animate
        name="radio"
        label="Radio"
        help="Texto de prueba"
        required
        :options="[
          {
            label: 'Opción Label 1',
            value: 'Opción 1',
            help: 'Texto de ayuda de ejemplo',
          },
          {
            label: 'Opción Label 2',
            value: 'Opción 2',
            help: 'Texto de ayuda de ejemplo',
          },
          {
            label: 'Opción Label 3',
            value: 'Opción 3',
            help: 'Texto de ayuda de ejemplo',
          },
          {
            label: 'Opción Label 4',
            value: 'Opción 4',
            help: 'Texto de ayuda de ejemplo',
          },
        ]"
      />
      <HiddenField name="hidden" :value="'hide'" />
      <ColorField
        v-auto-animate
        name="color"
        label="Color"
        help="Texto de prueba"
        required
      />
      <TelField
        v-auto-animate
        name="tel"
        label="Tel"
        help="Texto de prueba"
        placeholder="Tel ..."
        :max-lenght="10"
        required
      />
      <DateField
        v-auto-animate
        name="date"
        label="Date"
        help="Texto de prueba"
        placeholder="Date ..."
        :min="new Date('2023-09-20')"
        :max="'2023-09-29'"
        required
      />
      <DatetimeLocalField
        v-auto-animate
        name="datetimeLocal"
        label="Date Time"
        help="Texto de prueba"
        placeholder="Date time..."
        :min="new Date('2023-09-20T13:30')"
        :max="'2023-09-29T15:00'"
        required
      />
      <TimeField
        v-auto-animate
        name="time"
        label="Time"
        help="Texto de prueba"
        placeholder="time..."
        min="13:30"
        max="20:00"
        required
      />

      <div class="m-3 flex place-items-center gap-5">
        <button class="btn btn-primary" type="submit">Submit</button>
        <button class="btn btn-accent" type="reset">Reset</button>
      </div>
    </section>
    <section
      class="bg-base-300 rounded-box sticky top-[5vh] h-[90vh] w-[40%] flex-grow-0 p-5"
    >
      <pre>{{ { values, errors } }}</pre>
    </section>
  </LunarForm>
</template>
