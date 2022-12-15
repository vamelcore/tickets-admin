import { createI18n } from 'vue-i18n'
import store from '@/store';

function messages() {
  const messages = {}
  const context = import.meta.glob('@/i18n/messages/*.json', { eager: true })

  Object.entries(context).forEach(([key, value]) => {
    let pattern = /([A-Za-z0-9-_]+)\.json$/i;
    let locale = key.match(pattern)[1];
    if (locale) {
      messages[locale] = value
    }
  });

  return messages
}

function datetimeFormats() {
  const messages = {}
  const context = import.meta.glob('@/i18n/datetimeFormats/*.json', { eager: true })

  Object.entries(context).forEach(([key, value]) => {
    let pattern = /([A-Za-z0-9-_]+)\.json$/i;
    let locale = key.match(pattern)[1];
    if (locale) {
      messages[locale] = value
    }
  });

  return messages
}

function numberFormats() {
  const messages = {}
  const context = import.meta.glob('@/i18n/numberFormats/*.json', { eager: true })

  Object.entries(context).forEach(([key, value]) => {
    let pattern = /([A-Za-z0-9-_]+)\.json$/i;
    let locale = key.match(pattern)[1];
    if (locale) {
      messages[locale] = value
    }
  });

  return messages
}

const i18n = createI18n({
  locale: store.getters.locale,
  fallbackLocale: store.getters.fallbackLocale,
  messages: messages(),
  datetimeFormats: datetimeFormats(),
  numberFormats: numberFormats()
})

export default i18n
