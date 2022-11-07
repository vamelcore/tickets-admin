import { createStore } from 'vuex'
import SecureLS from 'secure-ls'
import VuexPersistence from 'vuex-persist'
import AuthModule from './modules/auth'

const ls = new SecureLS({ 
  isCompression: false 
})

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  saveState: (key, state) => ls.set(key, state),
  restoreState: (key) => ls.get(key)
})

const store = createStore({
  state: () => ({
    appUrl: process.env.VUE_APP_URL,
    locale: process.env.VUE_APP_I18N_LOCALE || "en",
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  }),
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
    auth: AuthModule
  },
  plugins: [
    vuexLocal.plugin
  ]
})

export default store