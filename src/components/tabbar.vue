<template>
  <div id="tabbar">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="home">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon">1</i>
        首页
      </mt-tab-item>
      <mt-tab-item id="publish">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon">2</i>
        发布
      </mt-tab-item>
      <mt-tab-item id="message">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon">3</i>
        消息
      </mt-tab-item>
      <mt-tab-item id="mine">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon">4</i>        
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: ''
    }
  },
  watch:{
    selected(newVal,oldVal) {
      if(newVal == 'person') {
        this.$router.push('person')
      }
      this.$router.push(newVal)
      localStorage.setItem('tabbarValue',newVal)
    }
  },
  methods:{
    
  },
  mounted(){
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
}
</style>
