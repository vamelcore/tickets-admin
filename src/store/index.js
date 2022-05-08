import { createStore } from 'vuex'

const store = createStore({
  state: {
    appUrl: process.env.VUE_APP_URL,
    locale: process.env.VUE_APP_I18N_LOCALE || "en",
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  },
  getters: {
    locale: state => {
      return state.locale
    },
    fallbackLocale: state => {
      return state.fallbackLocale
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

export default store