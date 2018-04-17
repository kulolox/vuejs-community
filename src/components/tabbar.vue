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
      selected: 'home'
    }
  },
  watch:{
    selected(newVal,oldVal) {
      // switch(newVal) {
      //   case 'home':
      //     this.$router.push('home')
      //     break;
      //   case 'publish':
      //     this.$router.push('publish')
      //     break;
      //   case 'message':
      //     this.$router.push('message')    
      //     break;
      //   case 'mine':
      //     if(!true){
      //       this.$router.push('person')            
      //     }else {
      //       this.$router.push('mine')
      //     }
      //     break;
      // }
      this.$router.push(newVal)
      localStorage.setItem('navTabIndex',newVal);
    },
    
  },
  methods:{
    
  },
  mounted(){
    let localData = localStorage.getItem('navTabIndex') || this.selected
    this.selected = localData
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
