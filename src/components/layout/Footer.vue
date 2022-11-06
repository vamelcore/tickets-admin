<template>
  <footer class="footer" :class="[{fix: this.footerFix}]">
    <div class="footer__copir">© {{copyRightYear}} SandBOX</div><a class="footer__mail" href="mailto:admin@sandbox.pp.ua" target="_blank">admin@sandbox.pp.ua</a>
  </footer>
</template>

<script>
export default {
  name: 'FooterLayout',
  data: function() {
    return {
      footerFix: false,
    }
  },
  computed: {
    copyRightYear() {
      return new Date().getFullYear();
    }
  },
  watch: {
    $route() {
      this.resize()
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.resize);
    })
  },
  methods: {
    resize() {
      let windowWidth = document.documentElement.clientWidth;
      const tablet = windowWidth  < 992;
      if(tablet && this.$route.name == 'activity') {
        this.footerFix = true;
      } else {
        this.footerFix = false;
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize);
  }
}
</script>

<style lang="scss">
.footer{
  margin-top: auto;
  display: flex;
  align-items: center;
  border-top: 1px solid #e4e4e4;
  padding: 28px 35px;
  &.fix{
    margin-bottom: 70px;
  }
  &__copir{
    color: #161616;
    font-size: 16px;
    line-height: 25px;
    margin-right: 30px;
  }
  &__mail{
    color: #161616;
    font-size: 16px;
    line-height: 25px;
    text-decoration: none;
    &:hover{
      color: #008cff;
    }
  }
}
  
@media (max-width: 768px)  {
  .footer{
    padding: 10px 20px;
    &__copir,
    &__mail{
      font-size: 14px;
    }
  }
}
</style>
