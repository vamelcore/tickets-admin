<template>
  <form class="start-page-form" @submit.prevent="register">
    <div class="start-page-form__title">{{ $t('auth.register.title') }}</div>
    <div class="form__group">
      <label class="form__label">{{ $t('auth.register.inputLabelName') }}</label>
      <div class="form__full start-page-form__input" :class="[validations.name]">
        <input class="form__input" type="text" required="required" v-model="user.name"/>
        <span class="checked--icon">
          <img src="@/assets/svg/checked.svg">
        </span>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label">{{ $t('auth.register.inputLabelEmail') }}</label>
      <div class="form__full start-page-form__input" :class="[validations.email]">
        <input class="form__input" type="email" required="required" v-model="user.email"/>
        <span class="checked--icon">
          <img src="@/assets/svg/checked.svg">
        </span>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label">{{ $t('auth.register.inputLabelPassword') }}</label>
      <div class="form__full start-page-form__input" :class="[validations.password]">
        <input class="form__input" type="password" required="required" v-model="user.password"/>
        <span class="checked--icon">
          <img src="@/assets/svg/checked.svg">
        </span>
      </div>
    </div>
    <div class="form__group">
      <label class="form__label">{{ $t('auth.register.inputLabelPasswordConfirmation') }}</label>
      <div class="form__full start-page-form__input" :class="[validations.password_confirmation]">
        <input class="form__input" type="password" required="required" v-model="user.password_confirmation"/>
        <span class="checked--icon">
          <img src="@/assets/svg/checked.svg">
        </span>
      </div>
    </div>
    <div class="form__group">
      <div class="input-round p-svg p-round p-pulse wrap-text pretty">
        <input type="checkbox" v-model="user.agreement" />
        <div class="state p-primary">
          <img src="@/assets/svg/check.svg" class="svg svg-icon svg-fill" />
          <label>{{ $t('auth.register.checkboxLabelTerms') }}</label>
        </div>
      </div>
    </div>
    <p class="error" v-if="validations.message">{{validations.message}}</p>
    <button class="btn">{{ $t('auth.register.buttonRegister') }}</button>
    <router-link class="form__link" :to="{name:'login'}">{{ $t('auth.register.buttonAuthorization') }}</router-link>
  </form>
</template>

<script>
import validationHelpers from "@/helpers/validationHelpers"
export default {
  name: 'RegisterView',
  data: function() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        agreement: null,
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
    register: function() {
      this.$store.dispatch('auth/register', this.user)
      .then(() => {
        this.$router.push({name:'home'})
      })
      .catch((errors) => {
        this.validationSet(this.validations, errors)
      })
    }
  },
  watch: {
    'user.name': function() {
      this.validationClean(this.validations, 'name')
    },
    'user.email': function() {
      this.validationClean(this.validations, 'email')
    },
    'user.password': function() {
      this.validationClean(this.validations, 'password')
    },
    'user.password_confirmation': function() {
      this.validationClean(this.validations, 'password_confirmation')
    },
  }
}
</script>

<style lang="scss"></style>
