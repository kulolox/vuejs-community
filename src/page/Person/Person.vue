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
        xxx
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
      user:{},
      userData:{},
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
    logout() {
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('tabbarValue')
      this.$router.push('home')
    },
    initData() {
      this.$axios.post('https://www.vue-js.com/api/v1/accesstoken',{
        accesstoken: this.AccessToken
      })
      .then(res => {
        // console.log(res)
        this.user = res.data
        this.getUserData()
      })
    },
    getUserData() {
      this.$axios.get('https://www.vue-js.com/api/v1/user/' + this.user.loginname)
      .then(res => {
        console.log(res)
        this.userData = res.data.data
      })
    }
  },
  mounted() {
    this.AccessToken = localStorage.getItem('accesstoken')
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
  .logout {
    position: absolute;
    bottom: 3.5rem;
    width: 100%;
    padding: 0 1rem;
    button {
      width: 100%;
    }
  }
}
</style>
