<template>
    <div id="app">
        <router-view />
    </div>
  </template>

  <script>
  import AdminHeader from '../AdminHeader.vue'
  import BaseFooter from '../AdminFooter.vue'
  export default {
    data: () => ({
      isShowSideBar: false
    }),

    components: {
      AdminHeader,
      AdminFooter
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
