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
          :class="{'selected':list.flag}">
            {{list.name}}
          </li>
        </ul>
      </div>
      <div class="title">
        <input type="text" v-model="title" placeholder="标题字数10字以上">
      </div>
      <div class="text">
        <textarea rows="10" placeholder="输入文本，支持markdown格式"
        v-model="text"
        ></textarea>
      </div>
      <mt-button type="primary" @click="publish">确认发布</mt-button>
    </div>
    <m-tabbar></m-tabbar>
  </div>
</template>

<script>
import marked from 'marked'
import mTabbar from '@/components/tabbar'
export default {
  data() {
    return {
      lists:[{name:'分享',flag:true},{name:'问答',flag:false},{name:'招聘',flag:false}],
      isTab: false,
      tab:'',
      title:'',
      text:'',
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
    //发布帖子
    publish() {
      let tabVal = ''
      if(this.tab == '分享') {
        tabVal = 'share'
      }else if(this.tab == '问答') {
        tabVal = 'ask'
      }else if(this.tab == '招聘') {
        tabVal = 'job'
      }
      this.text = marked(this.text)
      
      this.$axios.post('https://www.vue-js.com/api/v1/topics',{
        accesstoken: this.AccessToken,
        title: this.title,
        tab: tabVal,
        content: this.text
      })
      .then(res => {
        this.tab = ''
        this.title = ''
        this.text = ''
        this.$toast('帖子发布成功')
        setTimeout(()=>{
          localStorage.setItem('tabbarValue','home')
          this.$router.push('home')
        },1000)
      })
      .catch(err => {
        this.$toast('帖子发布失败，请重新发送')
      })
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
$color:#000;
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
      padding: .5rem 0 .5rem 1rem; 
      width: 100%;
      border:none;
      color: $color;
      background-color: #f3f3f3;
    }
    ul {
      position: absolute;
      width: 100%;
      z-index: 10;
      border: 1px solid #ccc;
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
      padding: .5rem 0 .5rem 1rem; 
      border:none;
      color: $color;
      background-color: #f3f3f3;
    }
  }
  .text {
    margin-top: 3rem;
    textarea {
      width: 100%;
      padding: .5rem 0 .5rem 1rem; 
      border:none;
      color: $color;
      background-color: #f3f3f3;
    }
  }
  button {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>