<template>
  <form class="start-page-form" @submit.prevent="login">
    <div class="start-page-form__title">{{ $t('auth.login.title') }}</div>
    <div class="form__group">
      <label class="form__label">{{ $t('auth.login.inputLabelEmail') }}</label>
      <div class="form__full start-page-form__input" :class="[validations.email]">
        <input class="form__input" type="email" v-model="credentials.email"/>
        <span class="checked--icon">
          <img src="@/assets/svg/checked.svg">
        </span>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label">{{ $t('auth.login.inputLabelPassword') }}</label>
      <div class="form__full start-page-form__input" :class="[validations.password]">
        <input class="form__input" type="password" v-model="credentials.password"/>
        <span class="checked--icon">
          <img src="@/assets/svg/checked.svg">
        </span>
      </div>
    </div>
    <p class="error" v-if="validations.message">{{validations.message}}</p>
    <button class="btn">{{ $t('auth.login.buttonEnter') }}</button>
    <router-link class="form__link" :to="{name:'restore'}">{{ $t('auth.login.forgotPassword') }}</router-link>
    <div class="start-page-form__bottom">{{ $t('auth.login.createAccount') }}
      <router-link class="form__link" :to="{name:'register'}">{{ $t('auth.login.buttonRegistration') }}</router-link>
    </div>
  </form>
</template>

<script>
import validationHelpers from "@/helpers/validationHelpers"
export default {
  name: 'LoginView',
  data: function() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      validations: {
        message: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    ...validationHelpers,
    login: function () {
      this.$store.dispatch('login', this.credentials)
      .then(() => {
        this.$router.push({name:'home'})
      })
      .catch((error) => {
        this.validationSet(this.validations, error)
      })
    }
  },
  watch: {
    'credentials.email': function() {
      this.validationClean(this.validations, 'email')
    },
    'credentials.password': function() {
      this.validationClean(this.validations, 'password')
    },
  }
}
</script>

<style lang="scss"></style>
