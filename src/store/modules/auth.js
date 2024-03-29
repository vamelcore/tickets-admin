import axios from '@/axios'

export default {
  namespaced: true,
  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login', credentials)
        .then(responce => {
          commit('login', responce.data)
          resolve(responce.data)
        })
        .catch(error => {
          reject(error.response.data)
        })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post('/register', user)
          .then(responce => {
            commit('login', responce.data)
            resolve(responce.data)
          })
          .catch(error => {
            reject(error.response.data)
          })
      })
    },
    passwordUpdate(_, passwords) {
      return new Promise((resolve, reject) => {
        axios.put('/password-update', passwords)
          .then(responce => {
            resolve(responce.data)
          })
          .catch(error => {
            reject(error.response.data)
          })
      })
    },
    passwordRestore(_, email) {
      return new Promise((resolve, reject) => {
        axios.post('/password-restore', email)
          .then(responce => {
            resolve(responce.data)
          })
          .catch(error => {
            reject(error.response.data)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        axios.post('/logout')
          .then(responce => {
            commit('logout')
            resolve(responce.data)
          })
      })
    },
  },
  mutations: {
    login(state, payload) {
      state.user = payload.data
      state.token = state.user.token ?? ''
    },
    logout(state) {
      state.token = ''
      state.user = {}
    },
  },
  state: () => ({
    token: '',
    user: {},
  }),
  getters: {
    isLoggedIn: state => !!state.token,
    getToken: state => state.token,
    getUser: state => state.user,
  }
}
