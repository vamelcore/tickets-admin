<template>
  <form class="start-page-form">
    <div class="start-page-form__title">Изменение пароля</div>
    <div class="form__group">
      <label class="form__label">Пароль</label>
      <div class="form__full">
        <input class="form__input" type="password" required="required" v-model="password"/>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label">Пароль</label>
      <div class="form__full">
        <input class="form__input" type="password" required="required" v-model="password_confirmation"/>
      </div>
    </div>
    <button class="btn">Изменить пароль</button>
  </form>
</template>
<script>
export default {
  name: 'PasswordView',
  data: function() {
    return {
      password: null,
      password_confirmation: null,
    }
  },
}
</script>

<style lang="scss">

</style>
