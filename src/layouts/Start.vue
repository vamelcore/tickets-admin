<template>
  <div class="start-page">
    <router-link class="start-page-logo" :to="{name:'home'}"><img src="@/assets/img/logo.png" alt="logo"/></router-link>
    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'StartLayout',
}
</script>

<style lang="scss">
.start-page {
  padding: 50px;
  height: 100vh;
  background-color: #008cff;
  background-image: linear-gradient(to right, #008cff 0%, #b533eb 100%);
  box-sizing: border-box;
  overflow-x: hidden;
  &-logo{
    width: 82px;
    height: 82px;
    display: block;
    margin: 0 auto 40px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>