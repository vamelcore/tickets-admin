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
    component: () => import('../views/auth/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'start',
      guest: true,
      title: i18n.global.t('auth.register.title'),
    },
    component: () => import('../views/auth/Register.vue'),
  },
  {
    path: '/password-restore',
    name: 'passwordRestore',
    meta: {
      layout: 'start',
      guest: true,
      title: i18n.global.t('auth.passwordRestore.title'),
    },
    component: () => import('../views/auth/PasswordRestore.vue'),
  },
  {
    path: '/password-update',
    name: 'passwordUpdate',
    meta: {
      layout: 'start',
      title: i18n.global.t('auth.passwordUpdate.title'),
    },
    component: () => import('../views/auth/PasswordUpdate.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (store.getters['auth/isLoggedIn']) {
    if (to.matched.some(record => record.meta.guest)) {
      next('/');
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    next()
  } else {
    next('/login')
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || import.meta.env.VITE_TITLE
})

export default router
