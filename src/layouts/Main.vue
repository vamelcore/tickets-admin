<template>
  <div class="page">
    <div class="page-content">
      <HeaderLayout />
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>      
    <FooterLayout />
  </div>
</template>

<script>

import HeaderLayout from '@/components/layout/Header.vue'
import FooterLayout from '@/components/layout/Footer.vue'

export default {
  name: 'MainLayout',
  components: {
    HeaderLayout,
    FooterLayout,
  }
}
</script>

<style>

</style>