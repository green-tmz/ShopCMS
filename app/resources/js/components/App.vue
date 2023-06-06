<template>
  <div id="app">
    <BaseHeader @show-sidebar="handleSidebar" />
    <router-view />
    <BaseFooter :showSideBar="isShowSideBar" />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'

export default {
  data: () => ({
    isShowSideBar: false
  }),

  components: {
    BaseHeader,
    BaseFooter
  },

  methods: {
    handleSidebar(showSideBar) {
      this.isShowSideBar = showSideBar
    }
  },

  created() {
    // if (! this.$store.hasModule('userName')) {
    // this.$store.registerModule('userName', user)
    // }
    // if (! this.$store.hasModule('products')) {
    // this.$store.registerModule('products', products)
    // }
  }
}
</script>

<style></style>
