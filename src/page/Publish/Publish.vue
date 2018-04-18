<template>
  <div id="publish">
    publish
    <m-tabbar></m-tabbar>
  </div>
</template>

<script>
import mTabbar from '@/components/tabbar'
export default {
  components: {
    mTabbar
  },
  methods: {
    // 判断是否登录
    isLogin() {
      let AccessToken = localStorage.getItem('accesstoken')
      if(AccessToken) {
        return
      }else {
        this.$messagebox.confirm('您尚未登录，是否登录？').then(action => {
          localStorage.setItem('tabbarValue','mine')
          this.$router.push('mine')
        },action => {
          localStorage.setItem('tabbarValue','home')
          this.$router.push('home')
        })
      }
    }
  },
  mounted() {
    this.isLogin()
  }
}
</script>

<style lang="scss" scoped>

</style>