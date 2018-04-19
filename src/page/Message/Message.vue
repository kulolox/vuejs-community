<template>
  <div id="message">
    <mt-header fixed title="消息中心"></mt-header>
    <div class="content">
      <mt-navbar v-model="active">
        <mt-tab-item id="notRead">未读消息</mt-tab-item>
        <mt-tab-item id="read">已读消息</mt-tab-item>       
      </mt-navbar>
      <div class="message">
        <mt-tab-container v-model="active">
          <mt-tab-container-item id="notRead">
            未读消息
          </mt-tab-container-item>
          <mt-tab-container-item id="read">
            已读消息
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <m-tabbar></m-tabbar>    
  </div>
</template>

<script>
import mTabbar from '@/components/tabbar'
export default {
  data() {
    return {
      AccessToken:'',
      active:'notRead'
      
    }
  },
  components: {
    mTabbar
  },
  methods: {
    // 判断是否登录
    isLogin() {
      this.AccessToken = localStorage.getItem('accesstoken')
      if(this.AccessToken) {
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
$color:#26a2ff;
.mint-header {
  height: 2.5rem;
  font-size: .8rem;
}
.content {
  position: relative;
  overflow: hidden;
  height: 100vh;
  padding: 2.5rem 0 3rem;
  .message {
    padding: 1rem;
  }
}
</style>