<template>
  <transition name="slide-fade" mode="out-in">
    <template v-if="this.$route.meta.layout == 'start' || !isLoggedIn">
      <StartLayout />
    </template>
    <template v-else>
      <MainLayout />
    </template>
  </transition>
</template>

<script>

import StartLayout from '@/layouts/Start.vue'
import MainLayout from '@/layouts/Main.vue'

export default {
  name: 'App',
  components: {
    MainLayout,
    StartLayout
  },
  data: function() {
    return {
      isHidden: false,
      intervalLoginChecker: null,
      requisites: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
  },
  methods: {
  },
  mounted: function () {
  },
  created: function () {
    this.axios.defaults.headers.common['Authorization'] = this.$store.getters.getToken || ''
    this.axios.interceptors.response.use(undefined, err => {
      if (err.response) {
        if (err.response.status === 401) {
          this.$store.dispatch('logout')
          .then(() => this.$router.push({name:'login'}))
          return Promise.resolve({data:{success:false}})
        }
      }
      return Promise.reject(err)
    })
  }
}

</script>

<style lang="scss">
@import "@/assets/style/main.scss";
</style>
