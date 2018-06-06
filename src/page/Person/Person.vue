<template>
  <div id="perspn">
    <mt-header fixed title="个人中心"></mt-header>
    <div class="content">
      <header>
        <!-- 个人信息 -->
        <img :src="user.avatar_url" alt="user">
        <span class="name">{{user.loginname}}</span>
        <div class="foot">
          <span>积分：{{userData.score}}</span>
          <span>注册时间：{{userData.create_at | timeago}}</span>
        </div>
      </header>
      <div class="collect">
        <div class="cList">
          <p @click="(open(0))">发布主题
            <i v-if="!isOpen0" class="iconfont icon-unfold"></i>
            <i v-if="isOpen0" class="iconfont icon-fold"></i>          
          </p>
          <ul v-if="isOpen0" class="recent-topics">
            <router-link tag="li" :to="{path:'/content',query:{id:item.id}}"
            v-for="(item,index) in recent_topics" :key="index">
              {{item.title}}
            </router-link>
          </ul>
        </div>
        <div class="cList">
          <p @click="open(1)">回复主题
            <i v-if="!isOpen1" class="iconfont icon-unfold"></i>
            <i v-if="isOpen1" class="iconfont icon-fold"></i>
          </p>
          <ul v-if="isOpen1" class="recent-topics">
            <router-link tag="li" :to="{path:'/content',query:{id:item.id}}"
            v-for="(item,index) in recent_replies" :key="index">
              {{item.title}}
            </router-link>
          </ul>
        </div>
        <div class="cList">
          <p @click="open(2)">收藏主题
            <i v-if="!isOpen2" class="iconfont icon-unfold"></i>
            <i v-if="isOpen2" class="iconfont icon-fold"></i>
          </p>
          <ul v-if="isOpen2" class="recent-topics">
            <router-link tag="li" :to="{path:'/content',query:{id:item.id}}"
            v-for="(item,index) in collect_topics" :key="index">
              {{item.title}}
            </router-link>
          </ul>
        </div>
      </div>
      <div class="logout">
        <mt-button type="primary" @click="logout">退出登录</mt-button>        
      </div>
    </div>
    <m-tabbar></m-tabbar>
  </div>
</template>

<script>
import mTabbar from '@/components/tabbar'
import timeago from 'timeago'
export default {
  data() {
    return {
      user:'',
      userData:'',
      recent_replies:'',
      recent_topics:'',
      collect_topics:'',
      isOpen0:false,
      isOpen1:false,
      isOpen2:false,
      AccessToken:''
    }
  },
  components: {
    mTabbar
  },
  filters: {
    timeago(val) {
      let time = new Date(val)
      let thisTime = timeago()
      return thisTime.format(time, 'zh_CN') //将UTC时间转换格式---> 几天前,几小时前...
    }
  },
  methods:{
    open(i) {
      if(i == 0) {
        this.isOpen0 = !this.isOpen0
      }else if(i == 1) {
        this.isOpen1 = !this.isOpen1
      }else if(i == 2) {
        this.isOpen2 = !this.isOpen2
      }
    },
    logout() {
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('tabbarValue')
      localStorage.removeItem('loginname')      
      this.$router.push('home')
    },
    initData() {
      this.$axios.post('https://www.vue-js.com/api/v1/accesstoken',{
        accesstoken: this.AccessToken
      })
      .then(res => {
        // 获取个人信息
        // console.log(res)
        localStorage.setItem('loginname',res.data.loginname)
        this.user = res.data
        this.getUserData()
      })
    },
    getUserData() {
      this.$axios.get('https://www.vue-js.com/api/v1/user/' + this.user.loginname)
      .then(res => {
        // console.log(res)
        this.userData = res.data.data
        this.recent_topics = res.data.data.recent_topics
        this.recent_replies = res.data.data.recent_replies
        this.collect_topics = res.data.data.collect_topics
      })
    }
  },
  mounted() {
    this.AccessToken = localStorage.getItem('accesstoken') || ''
    this.initData()
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
  overflow: hidden;
  position: relative;
  height: 100vh;
  padding: 2.5rem 0 3rem;
  header {
    border-bottom: 1px solid $color;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    img {
      width: 6rem;
      height: 6rem;
      border-radius: 50%;
      margin: 1rem 0;
    }
    .name {
      color: $color;
      font-size: 1rem;
      font-weight: 700;
    }
    .foot {
      width: 60%;
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
      span {
        font-size: .8rem;
        color:$color;
      }
    }
  }
  .collect {
    overflow: auto;
    max-height: 12rem;
    border-bottom: 1px solid $color;
    .cList {
      p {
        color: $color;
        padding: .5rem 0;
        overflow: hidden;
        i {
          float: right;
        }
      }
      ul {
        li {
          color: $color;
          padding: .5rem 0 .5rem 1rem;
        }
      }
      padding: 0 1rem;
    }
  }
  .logout {
    position: absolute;
    bottom: 4.5rem;
    width: 100%;
    padding: 0 1rem;
    button {
      width: 100%;
    }
  }
}
</style>
