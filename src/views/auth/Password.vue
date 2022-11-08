<template>
  <form class="start-page-form" @submit.prevent="password">
    <div class="start-page-form__title">{{ $t('auth.password.title') }}</div>
    <div class="form__group start-page-form__input" :class="[validations.password]">
      <label class="form__label">{{ $t('auth.password.inputLabelPassword') }}</label>
      <div class="form__full">
        <input class="form__input" type="password" required="required" v-model="credentials.password"/>
        <span class="checked--icon">
          <img src="@/assets/svg/checked.svg">
        </span>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label">{{ $t('auth.password.inputLabelPasswordConfirmation') }}</label>
      <div class="form__full start-page-form__input" :class="[validations.password_confirmation]">
        <input class="form__input" type="password" required="required" v-model="credentials.password_confirmation"/>
        <span class="checked--icon">
          <img src="@/assets/svg/checked.svg">
        </span>
      </div>
    </div>
    <p class="error" v-if="validations.message">{{validations.message}}</p>
    <button class="btn">{{ $t('auth.password.buttonUpdatePassword') }}</button>
  </form>
</template>

<script>
import validationHelpers from "@/helpers/validationHelpers"
export default {
  name: 'PasswordView',
  data: function() {
    return {
      credentials: {
        password: null,
        password_confirmation: null,
      },
      validations: {
        message: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  methods: {
    ...validationHelpers,
    password: function() {
      this.$store.dispatch('auth/password', this.credentials)
      .then(() => {
        this.$router.push({name:'home'})
      })
      .catch((errors) => {
        this.validationSet(this.validations, errors)
      })
    }
  },
  watch: {
    'credentials.password': function() {
      this.validationClean(this.validations, 'password')
    },
    'credentials.password_confirmation': function() {
      this.validationClean(this.validations, 'password_confirmation')
    },
  }
}
</script>

<style lang="scss"></style>
