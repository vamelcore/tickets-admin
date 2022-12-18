<template>
<header class="header">
  <template v-if="this.windowWidth > 1240">
    <router-link class="logo" :to="{name:'home'}" exact="exact"><img alt="logo" src="@/assets/img/logo.png"/></router-link>
    <ul class="header-nav">
      <li class="header-nav__li">
        <router-link class="header-nav__link" :to="{name:'home'}" exact="exact">Мероприятия</router-link>
      </li>
    </ul>
    <div class="user">
      <div class="user__cash cash-user">
        <div class="cash-user__title">Баланс</div>
        <div class="cash-user__count"><span>{{balance}}</span></div>
        <router-link class="header-nav__link cash-user__btn" :to="{name:'home'}">Вывести</router-link>
      </div>
      <div class="user__ava" :class="{user__ava_text: isLogoText}"><span v-if="isLogoText">{{userTxtLogo}}</span><img :src="userImgLogo" alt="ava" v-else/></div>
      <div class="user__menu menu-user">
        <a class="menu-user__name" href="#" @click.prevent="dropMenu">{{userName}}
          <img src="@/assets/svg/arrow.svg">
        </a>
        <ul class="menu-user__dropdown dropdown-menu" :class="{ active: isActive }">
          <li class="dropdown-menu__li"><a class="dropdown-menu__link" href="#">Настройки</a></li>
          <li class="dropdown-menu__li"><a class="dropdown-menu__link" href="#">Профиль</a></li>
          <li class="dropdown-menu__li"><a class="dropdown-menu__link" href="#">Download Invoice</a></li>
          <li class="dropdown-menu__li">
            <router-link class="dropdown-menu__link" :to="{name:'passwordUpdate'}">Изменить пароль</router-link>
          </li>
          <li class="dropdown-menu__li"><a class="dropdown-menu__link" href="#" @click.prevent="logoutButton">Выйти</a></li>
        </ul>
      </div>
    </div>
  </template>
  <template v-else>
    <template v-if="$route.meta.child">
      <a class="back-page" href="#" @click.prevent="$router.back()">
        <img src="@/assets/svg/arrow.svg">
      </a>
    </template>
    <template v-else>
      <a class="gamb" href="#" @click.prevent="mobileMenu = !mobileMenu">
        <img src="@/assets/svg/gamb.svg">
      </a>
    </template>
    <ul class="header-nav-mobile">
      <li class="header-nav-mobile__li">
        <router-link class="header-nav-mobile__link" :to="{name:'home'}">Мероприятия</router-link>
      </li>
    </ul>
    <div class="gamb-hidden" v-show="mobileMenu">
      <a class="gamb-close" href="#" @click.prevent="mobileMenu = !mobileMenu">
        <img src="@/assets/svg/close.svg">
      </a>
      <div class="user">
        <div class="user__top">
          <div class="user__ava" :class="{user__ava_text: isLogoText}">
            <span v-if="isLogoText">{{userTxtLogo}}</span>
            <img :src="userImgLogo" alt="ava" v-else/>
          </div>
          <div class="menu-user__name">{{userName}}</div>
        </div>
        <div class="user__cash cash-user">
          <div class="cash-user__info">
            <div class="cash-user__title">Баланс</div>
            <div class="cash-user__count"><span>{{balance}}</span></div>
          </div>
          <router-link class="cash-user__btn" :to="{name:'home'}">Вывести</router-link>
        </div>
        <ul class="nav-mobile">
          <li class="nav-mobile__li">
            <router-link class="nav-mobile__link" :to="{name:'home'}">Мероприятия</router-link>
          </li>
        </ul>
        <ul class="menu-user__mobile mobile-menu-user">
          <li class="mobile-menu-user__li"><a class="mobile-menu-user__link" href="#">Настройки</a></li>
          <li class="mobile-menu-user__li"><a class="mobile-menu-user__link" href="#">Профиль</a></li>
          <li class="nav-mobile__li">
            <router-link class="mobile-menu-user__link" :to="{name:'passwordUpdate'}">Изменить пароль</router-link>
          </li>
          <li class="mobile-menu-user__li"><a class="mobile-menu-user__link" href="#" @click.prevent="logoutButton">Выйти</a></li>
        </ul>
      </div>
    </div>
  </template>
</header>
</template>
<script>

import localeFormatter from "@/helpers/localeFormatter"

  export default {
    name: 'HeaderLayout',
    data: function() {
      return {
        windowWidth: null,
        isActive: false,
        mobileMenu: false,
        userData: {},
      }
    },
    watch: {
      $route() {
        this.mobileMenu = false;
      }
    },
    mounted() {
      let vm = this;
      document.addEventListener('click', function () {
        const el = event.target.className;
        if(el != 'menu-user__name') {
          vm.isActive = false;
        }
      });
      this.$nextTick(function() {
        window.addEventListener('resize', this.resize);
        //Init
        this.resize()
      });

      this.userData = this.$store.getters['auth/getUser']
    },
    computed: {
      userName: function() {
        let userName = ''
        if (this.userData.name) {
          userName += this.userData.name
        }
        return userName.trim() || 'No Data'
      },
      userImgLogo: function() {
        return this.userData.logo || ''
      },
      userTxtLogo: function() {
        let userLogo = ''
        if (this.userData.name) {
          userLogo += this.userData.name.substr(0,1).toUpperCase()
        }
        return userLogo || 'ND'
      },
      isLogoText: function() {
        return true
      },
      balance: function() {
        return 0
      }
    },
    methods: {
      ...localeFormatter,
      dropMenu() {
        return this.isActive = !this.isActive;
      },
      resize() {
        this.windowWidth = document.documentElement.clientWidth;
      },
      logoutButton() {
        this.$store.dispatch('auth/logout')
        .then(() => this.$router.push({name:'login'}))
      },
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.resize);
    }
  }
</script>

<style lang="scss">
.header{
  display: flex;
  align-items: center;
  padding: 13px 40px 13px;
  box-shadow: 0 0 10px rgba(196, 202, 214, 0.8);
  background-color: #f4f5f6;
  position: relative;
  &-nav{
    display: flex;
    padding: 0;
    margin: 0;
    &__li{
      display: block;
      margin-right: 25px;
    }
    &__link{
      color: #161616;
      font-family: "Open Sans";
      font-size: 16px;
      font-weight: 400;
      line-height: 25px;
      text-decoration: none;
      &.router-link-active{
        font-weight: bold;
      }
    }
  }
}
.logo{
  width: 55px;
  height: 55px;
  margin-right: 40px;
  img{
    display: block;
    width: 100%;
  }
}
.user{
  margin-left: auto;
  display: flex;
  align-items: center;
  &__ava{
    margin-right: 20px;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__ava_text{
    background-color: #008cff;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      color: white;
      font-size: 24px;
      font-weight: 700;
    }
  }
}
.cash-user{
  display: flex;
  align-items: center;
  margin-right: 20px;
  &__title{
    color: #161616;
    font-size: 16px;
    line-height: 25px;
    margin-right: 8px;
  }
  &__count{
    color: #161616;
    font-size: 20px;
    font-weight: 700;
    line-height: 25px;
    margin-right: 10px;
  }
  &__btn{
    border-radius: 18px;
    background-color: #008cff;
    padding: 8px 18px 10px;
    color: #fff;
    font-size: 18px;
    text-decoration: none;
    &:hover{
      background-color: #026ac0;
    }
  }
}
.menu-user{
  display: flex;
  align-items: center;
  position: relative;
  &__name{
    color: #161616;
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    text-decoration: none;
    .svg-icon{
      margin-left: 10px;
    }
  }
}
.dropdown-menu{
  position: absolute;
  top: 63px;
  right: 0;
  width: 137px;
  box-shadow: 0 0 10px rgba(196, 202, 214, 0.8);
  background-color: #ffffff;
  padding: 0;
  margin: 0;
  display: none;
  z-index: 1;
  &.active{
    display: block;
  }
  &__li{
    display: block;
  }
  &__link{
    color: #161616;
    font-size: 16px;
    text-decoration: none;
    padding: 15px 25px;
    display: block;
    &:hover{
      background-color: #e7f1f8;
    }
  }
}

.header-nav-mobile{
  padding: 0;
  margin: 0;
  &__li{
    display: block;
  }
  &__link{
    display: none;
    color: #161616;
    font-size: 22px;
    font-weight: 700;
    line-height: 25px;
    text-decoration: none;
    &.router-link-active{
      display: block;
    }
  }
}
.back-page{
  flex-shrink: 0;
  margin-right: 20px;
  color: #161616;
  width: 25px;
  .svg-icon{
    display: block;
    width: 20px;
    height: 20px;
  }
}
.gamb{
  flex-shrink: 0;
  margin-right: 20px;
  color: #161616;
  width: 25px;
  .svg-icon{
    display: block;
    width: 25px;
    height: 25px;
  }
}
.gamb-close{
  position: absolute;
  top: 23px;
  right: 23px;
  width: 20px;
  height: 20px;
  color: #161616;
  .svg-icon{
    display: block;
    width: 100%;
    height: 100%;
  }
}
.gamb-hidden{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 0 10px rgba(196, 202, 214, 0.8);
  background-color: #f4f5f6;
  padding: 15px;
  box-sizing: border-box;
  z-index: 10;
  min-height: 100vh;
  .user{
    flex-direction: column;
    align-items: flex-start;
    &__ava{
      margin-right: 10px;
    }
    &__top{
      display: flex;
      align-items: center;
      margin-bottom: 35px;
    }
    .menu-user__name{
      max-width: 150px;
    }
  }
  .cash-user{
    width: 100%;
    justify-content: space-between;
    margin-right: 0;
  }
}
.nav-mobile{
  background: #fff;
  margin: 0;
  padding: 20px;
  width: 100%;
  margin: 30px -20px;
  &__li{
    display: block;
    &:last-child{
      .nav-mobile__link{
        margin-bottom: 0;
      }
    }
  }
  &__link{
    color: #161616;
    font-size: 18px;
    font-weight: 400;
    line-height: 25px;
    text-decoration: none;
    margin-bottom: 20px;
    display: block;
    &.router-link-active{
      font-weight: 700;
    }
  }
}
.mobile-menu-user{
  margin: 0;
  padding: 0;
  &__li{
    display: block;
  }
  &__link{
    color: #161616;
    font-size: 16px;
    font-weight: 400;
    line-height: 25px;
    text-decoration: none;
    margin-bottom: 20px;
    display: block;
    &.router-link-active{
      font-weight: 700;
    }
  }
}
@media (max-width: 991px)  {
  .header{
    padding: 23px 20px;
  }
}
</style>
