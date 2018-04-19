<template>
  <div id="publish">
    <mt-header fixed title="发布话题"></mt-header>
    <div class="content">
      <div class="tab">
        <input type="text" v-model="tab" placeholder="请选择板块" 
        readonly
        @click="openTab">
        <ul class="lists" v-show="isTab">
          <li v-for="(list,index) in lists" :key="index"
          @click="choseTab(list)"
          :class="{'selected':list.flag}"
          >
            {{list.name}}
          </li>
        </ul>
      </div>
      <div class="title">
        <input type="text" v-model="title" placeholder="标题字数10字以上">
      </div>
      <div class="text">
        <textarea rows="10" placeholder="输入文本，支持markdown格式"></textarea>
      </div>
      <mt-button type="primary">确认发布</mt-button>
    </div>
    <m-tabbar></m-tabbar>
  </div>
</template>

<script>
import mTabbar from '@/components/tabbar'
export default {
  data() {
    return {
      lists:[{name:'分享',flag:true},{name:'问答',flag:false},{name:'招聘',flag:false}],
      isTab: false,
      tab:'',
      title:'',
      AccessToken:''
    }
  },
  components: {
    mTabbar
  },
  methods: {
    openTab() {
      this.isTab = !this.isTab
    },
    choseTab(list) {
      let arr = this.lists
      arr.map(item => {
        item.flag = false
      })
      list.flag = true
      this.tab = list.name
      this.isTab = false
    },
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
  padding: 2.5rem 1rem 3rem;
  .tab {
    position: relative;
    width: 100%;
    margin: 1rem 0;
    input {
      padding-left: 1rem; 
      width: 100%;
      color: $color;
    }
    ul {
      position: absolute;
      width: 100%;
      z-index: 10;
      border: 1px solid #ccc;
      border-top: none;
      background-color: #f3f3f3;
      li {
        padding: .2rem 0 0.2rem 1rem;
      }
    }
    .selected {
      color: $color;
    }
  }
  .title {
    margin-top: 2rem;
    input {
      width: 100%;
      padding-left: 1rem;
      color: $color;
    }
  }
  .text {
    margin-top: 4rem;
    textarea {
      width: 100%;
    }
  }
  button {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>