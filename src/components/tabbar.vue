<template>
  <div id="tabbar">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="home">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon" class="iconfont icon-home"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="publish">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon" class="iconfont icon-edit"></i>        
        发布
      </mt-tab-item>
      <mt-tab-item id="message">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon" class="iconfont icon-calendar"></i>
        消息
      </mt-tab-item>
      <mt-tab-item v-if="!isLogin" id="mine">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon" class="iconfont icon-people"></i> 
        我的
      </mt-tab-item>
      <mt-tab-item v-if="isLogin" id="person">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon" class="iconfont icon-people"></i>    
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '',
      isLogin: false
    }
  },
  watch:{
    selected(newVal,oldVal) {
      this.$router.push(newVal)
      localStorage.setItem('tabbarValue',newVal)
    }
  },
  methods:{
    
  },
  mounted(){
    let AccessToken = localStorage.getItem('accesstoken') || ''
    if(AccessToken) {
      this.isLogin = true
    }else {
      this.isLogin = false
    }
    this.selected = localStorage.getItem('tabbarValue') || 'home'
  }
}
</script>

<style lang="scss" scoped>
#tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  .iconfont {
    font-size: 1.1rem;
  }
}
</style>
