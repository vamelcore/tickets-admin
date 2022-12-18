<template>
  <form class="start-page-form" @submit.prevent="passwordRestore">
    <div class="start-page-form__title">{{ $t('auth.passwordRestore.title') }}</div>
    <div class="form__text">{{ $t('auth.passwordRestore.forRestoreEnterEmail') }}</div>
    <div class="form__group">
      <label class="form__label">{{ $t('auth.passwordRestore.inputLabelEmail') }}</label>
      <div class="form__full start-page-form__input" :class="[validations.email]">
        <input class="form__input" type="email" required="required" v-model="email"/>
        <span class="checked--icon">
          <img src="@/assets/svg/checked.svg">
        </span>
      </div>
    </div>
    <p class="success" v-if="success">{{ $t('auth.passwordRestore.successMessage') }}</p>
    <p class="error" v-if="validations.message">{{validations.message}}</p>
    <button class="btn">{{ $t('auth.passwordRestore.buttonRestore') }}</button>
    <router-link class="form__link" :to="{name:'login'}">{{ $t('auth.passwordRestore.buttonAuthorization') }}</router-link>
  </form>
</template>

<script>
import validationHelpers from "@/helpers/validationHelpers"
export default {
  name: 'PasswordRestoreView',
  data: function() {
    return {
      email: null,
      success: false,
      validations: {
        message: '',
        email: '',
      },
    }
  },
  methods: {
    ...validationHelpers,
    passwordRestore: function() {
      this.$store.dispatch('auth/passwordRestore', {'email':this.email})
      .then(() => {
        this.success = true
      })
      .catch((errors) => {
        this.validationSet(this.validations, errors)
      })
    }
  },
  watch: {
    email: function() {
      this.validationClean(this.validations, 'email')
    }
  }
}
</script>

<style lang="scss"></style>
