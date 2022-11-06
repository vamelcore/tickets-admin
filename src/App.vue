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
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    },
  },
}

</script>

<style lang="scss">
@import "@/assets/style/main.scss";
</style>
