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
    appUrl: import.meta.env.VITE_URL,
    locale: import.meta.env.VITE_I18N_LOCALE || "en",
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || "en",
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