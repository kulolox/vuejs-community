<template>
  <div id="mine">
    <mt-header title="登录"></mt-header>
    <div class="form">
      <mt-field label="AccessToken:" 
      placeholder="请输入Access Token"
      v-model="AccessToken"
      ></mt-field>
      <mt-button type="primary" @click="login">登录</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AccessToken:''
    }
  },
  methods:{
    login() {
      this.$axios.post('https://www.vue-js.com/api/v1/accesstoken',{
        accesstoken: this.AccessToken
      })
      .then(res => {
        // 将AccessToken存储在本地
        localStorage.setItem('accesstoken', this.AccessToken)
        this.$router.push('person')
      })
      .catch(err => {
        this.$toast('AccessToken错误，请确认~')
      })
    }
  },
  mounted() {
    let accesstoken = localStorage.getItem('accesstoken')
    if(accesstoken) {
      this.$router.push('person')
    }else {
      this.$router.push('mine')
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-header {
  height: 2.5rem;
  font-size: .8rem;
}
.form {
  width: 100%;
  height: 10rem;
  margin: 6rem auto 0;
  padding: 0 1rem;
  .mint-field {
    border: 1px solid #ccc;
    border-radius: .4rem;
  }
  button {
    margin-top: 3rem;
    width: 100%;
  }
}
</style>