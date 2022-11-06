<template>
  <form class="start-page-form">
    <div class="start-page-form__title">Регистрация</div>
    <div class="form__group">
      <label class="form__label">Фамилия и Имя</label>
      <div class="form__full">
        <input class="form__input" type="text" required="required" v-model="fio" name="fio"/>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label">E-mail</label>
      <div class="form__full">
        <input class="form__input" type="email" required="required" v-model="email" name="email"/>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label">Телефон</label>
      <div class="form__full">
        <input class="form__input" type="text" required="required" v-model="tel" name="tel"/>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label">Пароль</label>
      <div class="form__full">
        <input class="form__input" type="password" required="required" v-model="password"/>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label">Подтвердить пароль</label>
      <div class="form__full">
        <input class="form__input" type="password" required="required" v-model="password_confirmation"/>
      </div>
    </div>
    <div class="form__group">
      <div class="input-round p-svg p-round p-pulse wrap-text pretty">
        <input type="checkbox" required="required" v-model="spam" />
        <div class="state p-primary">
          <img src="@/assets/svg/check.svg" class="svg svg-icon svg-fill" />
          <label>Даю согласие на получение уведомлений  и информационных рассылок</label>
        </div>
      </div>
    </div>
    <button class="btn">Сохранить</button>
    <router-link class="form__link" :to="{name:'login'}">Авторизация</router-link>
  </form>
</template>

<script>
export default {
  name: 'RegisterView',
  data: function() {
    return {
      fio: null,
      tel: null,
      email: null,
      password: null,
      password_confirmation: null,
      spam: null,
    }
  },
}
</script>

<style lang="scss">
</style>
