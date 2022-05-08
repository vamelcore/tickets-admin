import { createI18n } from 'vue-i18n'
import store from '@/store';

function loadLocalization() {
  const messages = {}
  const context = require.context('@/i18n/locales', true, /[A-Za-z0-9-_]+\.json$/i)

  context.keys().forEach(key => {
    const locale = key.match(/[A-Za-z0-9-_]+/i)[0]
    if (locale) {
      messages[locale] = context(key)
      //import ('vue2-datepicker/locale/'+locale)
    }
  })

  return messages
}

const i18n = createI18n({
  locale: store.getters.locale,
  fallbackLocale: store.getters.fallbackLocale,
  messages: loadLocalization(),
})

export default i18n
