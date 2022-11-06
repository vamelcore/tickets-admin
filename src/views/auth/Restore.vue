<template>
  <form class="start-page-form">
    <div class="start-page-form__title">Восстановление пароля</div>
    <div class="form__text">Для сброса пароля введите ваш E-mail</div>
    <div class="form__group">
      <label class="form__label">E-mail</label>
      <div class="form__full">
        <input class="form__input" type="email" required="required" v-model="email"/>
      </div>
    </div>
    <router-link class="btn" :to="{name:'restore'}">Сбросить пароль</router-link>
    <router-link class="form__link" :to="{name:'login'}">Авторизация</router-link>
  </form>
</template>
<script>
export default {
  name: 'RestoreView',
  data: function() {
    return {
      email: null,
    }
  },
}
</script>

<style lang="scss">

</style>
