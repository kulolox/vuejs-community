<template>
  <div id="app">
    <router-view/>
    <m-tabbar v-if="isTabbar"></m-tabbar>
  </div>
</template>

<script>
import './assets/css/reset.css'
import mTabbar from '@/components/tabbar.vue'
export default {
  computed:{
    isTabbar() {
      return this.$store.state.isTabbar
    }
  },
  components:{
    mTabbar
  }
}
</script>

<style>

</style>
