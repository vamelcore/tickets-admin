import axios from 'axios'
import store from '@/store'
import router from '@/router'

const instance = axios.create({
  withCredentials: false,
  baseURL: process.env.VITE_APP_REQUEST_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  config => {
    if (store.getters.getToken) {
      config.headers.Authorization = 'Bearer ' + store.getters.getToken;
    } else {
      delete config.headers.Authorization;
    }
    return config
  }
)

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      if (store.getters.isLoggedIn) {
        store.commit('logout')
        router.push({ name: 'login' })
      }
    }
    return Promise.reject(error)
  }
)

export default instance
