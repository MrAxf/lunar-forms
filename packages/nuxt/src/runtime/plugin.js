import { defineNuxtPlugin } from '#app'
import { lunarFormsFieldsPlugin } from '@lunar-forms/fields'

import config from '@/<%= options.config %>'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(lunarFormsFieldsPlugin, config)
})
