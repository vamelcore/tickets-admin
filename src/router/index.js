import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import i18n from '@/i18n'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'start',
      guest: true,
      title: i18n.global.t('auth.login.title'),
    },
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/registration',
    name: 'registration',
    meta: {
      layout: 'start',
      guest: true,
      title: i18n.global.t('auth.register.title'),
    },
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/restore',
    name: 'restorePassword',
    meta: {
      layout: 'start',
      guest: true,
      title: i18n.global.t('auth.restore.title'),
    },
    component: () => import('../views/LoginView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (store.getters.isLoggedIn && to.matched.some(record => record.meta.guest)) {
    next('/')
  } else if (store.getters.isLoggedIn || to.matched.some(record => record.meta.guest)) {
    next()
  } else {
    next('/login')
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || process.env.VUE_APP_TITLE
})

export default router
