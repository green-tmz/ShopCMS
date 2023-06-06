<template>
  <footer class="footer">
    <span class="scroll__top" @click="goTop" v-show="showScrollTop"></span>
    <div class="footer__top">
      <div class="container">
        <div class="footer__row">
          <div class="footer__getcall">
            <img src="img/tamasbama.png" alt="" />
            <div class="footer__getcall-info">
              <h3 class="footer__getcall-h3">contact us</h3>
              <span class="gooter__getcall-span">any questions? ask us !</span>
            </div>
          </div>
          <div class="footer__info">
            <span class="footer__info-span"><b>Email:</b> info@domian.com</span><br />
            <span class="footer__info-span"><b>Тел:</b> 8 (800) 555-55-55</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__main">
      <div class="container">
        <div class="footer__links">
          <a href="" class="footer__link">Link 1</a>
          <a href="" class="footer__link">Link 1</a>
          <a href="" class="footer__link">Link 1</a>
          <a href="" class="footer__link">Link 1</a>
          <a href="" class="footer__link">Link 1</a>
          <a href="" class="footer__link">Link 1</a>
        </div>
        <div class="footer__hr"></div>
        <div class="footer__about">
          <p class="footer__txt">

          </p>
        </div>
      </div>
      <div class="footer__team">

      </div>
    </div>
    <div class="overlay" :class="{ 'overlay--is-active': showSideBar }"></div>
  </footer>
</template>

<script>
export default {
  name: 'BaseFooter',

  props: {
    showSideBar: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    showScrollTop: false,
    scrollTimeout: null
  }),

  methods: {
    handleScroll() {
      if (this.scrollTimeout) return

      console.log('user scrolled')

      this.scrollTimeout = setTimeout(() => {
        this.showScrollTop = window.scrollY > 200

        clearTimeout(this.scrollTimeout)
        this.scrollTimeout = 0
      }, 150)
    },
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },

  mounted() {
    document.addEventListener('scroll', this.handleScroll)
  },

  unmounted() {
    document.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style></style>
